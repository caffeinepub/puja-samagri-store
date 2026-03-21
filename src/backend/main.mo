import Stripe "stripe/stripe";
import OutCall "http-outcalls/outcall";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  type ProductCategory = {
    #flowers;
    #haar;
    #books;
    #pujaEssentials;
    #thaliSets;
    #occasionPackages;
  };

  type Product = {
    id : Nat;
    name : Text;
    category : ProductCategory;
    description : Text;
    price : Nat;
    unit : Text;
    inStock : Bool;
    occasionTag : ?Text;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type OrderItem = {
    product : Product;
    quantity : Nat;
  };

  type OrderStatus = {
    #pending : ();
    #processed : ();
    #shipped : ();
    #cancelled : ();
  };

  type Order = {
    id : Nat;
    customerName : Text;
    address : Text;
    phone : Text;
    items : [OrderItem];
    total : Nat;
    status : OrderStatus;
    user : Principal;
  };

  public type UserProfile = {
    name : Text;
  };

  type PanditAvailability = {
    panditId : Text;
    available : Bool;
  };

  type Review = {
    productId : Nat;
    rating : Nat;
    comment : Text;
    reviewer : Principal;
  };

  type PrasadOrderStatus = {
    #pending : ();
    #confirmed : ();
    #dispatched : ();
    #delivered : ();
    #cancelled : ();
  };

  type PrasadOrder = {
    id : Nat;
    userId : Principal;
    templeId : Nat;
    templeName : Text;
    prasadItemName : Text;
    quantity : Nat;
    pricePerBox : Nat;
    totalPrice : Nat;
    deliveryAddress : Text;
    contactNumber : Text;
    instructions : Text;
    status : PrasadOrderStatus;
    createdAt : Int;
  };

  type StripeSession = {
    sessionId : Text;
    userId : Principal;
    createdAt : Int;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let productStore = Map.empty<Nat, Product>();
  let cartStore = Map.empty<Principal, List.List<CartItem>>();
  let orderStore = Map.empty<Nat, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let panditAvailabilityStore = Map.empty<Text, Bool>();
  let reviewStore = Map.empty<Nat, List.List<Review>>();
  let prasadOrderStore = Map.empty<Nat, PrasadOrder>();
  let stripeSessionStore = Map.empty<Text, StripeSession>();

  var nextProductId = 1;
  var nextOrderId = 1;
  var nextReviewId = 1;
  var nextPrasadOrderId = 1;

  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management
  public shared ({ caller }) func addProduct(name : Text, category : ProductCategory, description : Text, price : Nat, unit : Text, inStock : Bool, occasionTag : ?Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product : Product = {
      id = nextProductId;
      name;
      category;
      description;
      price;
      unit;
      inStock;
      occasionTag;
    };
    productStore.add(nextProductId, product);
    nextProductId += 1;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, category : ProductCategory, description : Text, price : Nat, unit : Text, inStock : Bool, occasionTag : ?Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (productStore.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          category;
          description;
          price;
          unit;
          inStock;
          occasionTag;
        };
        productStore.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func removeProduct(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove products");
    };
    productStore.remove(id);
  };

  public query func getAllProducts() : async [Product] {
    productStore.values().toArray().sort();
  };

  public query func getProductsByCategory(category : ProductCategory) : async [Product] {
    let filtered = productStore.values().toArray().filter(func(p) { p.category == category });
    filtered.sort();
  };

  // Cart Management
  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    switch (productStore.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let currentCart = switch (cartStore.get(caller)) {
          case (null) { List.empty<CartItem>() };
          case (?cart) { cart };
        };
        let newItem : CartItem = { productId; quantity };
        let updatedCart = currentCart.filter(func(item) { item.productId != productId });
        updatedCart.add(newItem);
        cartStore.add(caller, updatedCart);
      };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    switch (cartStore.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) {
        let updatedCart = cart.filter(func(item) { item.productId != productId });
        cartStore.add(caller, updatedCart);
      };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };
    cartStore.remove(caller);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };
    switch (cartStore.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  // Stripe Payment Integration
  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    // Verify caller owns this session or is admin
    switch (stripeSessionStore.get(sessionId)) {
      case (null) { Runtime.trap("Session not found") };
      case (?session) {
        if (session.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only check your own session status");
        };
        await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
      };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    let sessionId = await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);

    // Store session ownership for later verification
    let session : StripeSession = {
      sessionId;
      userId = caller;
      createdAt = Time.now();
    };
    stripeSessionStore.add(sessionId, session);

    sessionId;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Order Management
  public shared ({ caller }) func placeOrder(customerName : Text, address : Text, phone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };
    let cart = switch (cartStore.get(caller)) {
      case (null) { Runtime.trap("Cart is empty") };
      case (?cart) { cart };
    };

    if (cart.isEmpty()) { Runtime.trap("Cart is empty") };

    var total = 0;
    var orderItems : [OrderItem] = [];

    for (cartItem in cart.values()) {
      switch (productStore.get(cartItem.productId)) {
        case (null) { };
        case (?product) {
          let orderItem : OrderItem = { product; quantity = cartItem.quantity };
          orderItems := orderItems.concat([orderItem]);
          total += product.price * cartItem.quantity;
        };
      };
    };

    if (orderItems.size() == 0) { Runtime.trap("No valid products in cart") };

    let order : Order = {
      id = nextOrderId;
      customerName;
      address;
      phone;
      items = orderItems;
      total;
      status = #pending;
      user = caller;
    };

    orderStore.add(nextOrderId, order);
    nextOrderId += 1;
    cartStore.remove(caller);
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    orderStore.values().toArray().filter(func(order) { order.user == caller });
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orderStore.values().toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orderStore.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : Order = { order with status };
        orderStore.add(orderId, updatedOrder);
      };
    };
  };

  public shared ({ caller }) func setPanditAvailability(panditId : Text, available : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can set pandit availability");
    };
    panditAvailabilityStore.add(panditId, available);
  };

  public query func getPanditAvailabilities() : async [PanditAvailability] {
    let iter = panditAvailabilityStore.entries();
    iter.toArray().map(func((panditId, available)) { { panditId; available } });
  };

  // Review System
  public shared ({ caller }) func addReview(productId : Nat, rating : Nat, comment : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };
    if (rating < 1 or rating > 5) { Runtime.trap("Rating must be between 1 and 5") };
    switch (productStore.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let review : Review = {
          productId;
          rating;
          comment;
          reviewer = caller;
        };
        let currentReviews = switch (reviewStore.get(productId)) {
          case (null) { List.empty<Review>() };
          case (?reviews) { reviews };
        };
        currentReviews.add(review);
        reviewStore.add(productId, currentReviews);
        nextReviewId += 1;
      };
    };
  };

  public query func getProductReviews(productId : Nat) : async [Review] {
    switch (reviewStore.get(productId)) {
      case (null) { [] };
      case (?reviews) { reviews.toArray() };
    };
  };

  // Prasad Booking Features
  public shared ({ caller }) func bookPrasad(templeId : Nat, templeName : Text, prasadItemName : Text, quantity : Nat, pricePerBox : Nat, deliveryAddress : Text, contactNumber : Text, instructions : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can book prasad");
    };
    if (quantity == 0 or quantity > 10) { Runtime.trap("Quantity must be between 1 and 10") };

    let totalPrice = pricePerBox * quantity;

    let prasadOrder : PrasadOrder = {
      id = nextPrasadOrderId;
      userId = caller;
      templeId;
      templeName;
      prasadItemName;
      quantity;
      pricePerBox;
      totalPrice;
      deliveryAddress;
      contactNumber;
      instructions;
      status = #pending;
      createdAt = Time.now();
    };

    prasadOrderStore.add(nextPrasadOrderId, prasadOrder);
    nextPrasadOrderId += 1;
  };

  public query ({ caller }) func getPrasadOrders() : async [PrasadOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view prasad orders");
    };
    prasadOrderStore.values().toArray().filter(func(order) { order.userId == caller });
  };

  public query ({ caller }) func getAllPrasadOrders() : async [PrasadOrder] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all prasad orders");
    };
    prasadOrderStore.values().toArray();
  };

  public shared ({ caller }) func cancelPrasadOrder(orderId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can cancel orders");
    };
    switch (prasadOrderStore.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (order.userId != caller) {
          Runtime.trap("Unauthorized: Can only cancel your own orders");
        };
        if (order.status != #pending and order.status != #confirmed) {
          Runtime.trap("Order cannot be cancelled at this stage");
        };
        let updatedOrder = { order with status = #cancelled };
        prasadOrderStore.add(orderId, updatedOrder);
      };
    };
  };

  public shared ({ caller }) func updatePrasadOrderStatus(orderId : Nat, status : PrasadOrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (prasadOrderStore.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = { order with status };
        prasadOrderStore.add(orderId, updatedOrder);
      };
    };
  };

  // Self-Service User Registration
  public shared ({ caller }) func ensureCallerIsUser() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous users cannot register as users. Please login with an II or wallet first.");
    };

    let role = accessControlState.userRoles.get(caller);

    switch (role) {
      case (null) {
        accessControlState.userRoles.add(caller, #user);
      };
      case (?_) { () };
    };
  };

  // First-run admin claim: works only if no admin has been assigned yet
  public shared ({ caller }) func claimFirstAdmin() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous users cannot claim admin. Please login first.");
    };
    if (accessControlState.adminAssigned) {
      Runtime.trap("An admin has already been assigned.");
    };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
  };

  // Check if any admin has been assigned yet
  public query func isAdminAssigned() : async Bool {
    accessControlState.adminAssigned;
  };
};
