import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Review {
    productId: bigint;
    comment: string;
    rating: bigint;
    reviewer: Principal;
}
export interface Order {
    id: bigint;
    customerName: string;
    status: OrderStatus;
    total: bigint;
    user: Principal;
    address: string;
    phone: string;
    items: Array<OrderItem>;
}
export interface PanditAvailability {
    available: boolean;
    panditId: string;
}
export interface OrderItem {
    quantity: bigint;
    product: Product;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    unit: string;
    occasionTag?: string;
    description: string;
    category: ProductCategory;
    price: bigint;
}
export interface UserProfile {
    name: string;
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    processed = "processed"
}
export enum ProductCategory {
    occasionPackages = "occasionPackages",
    haar = "haar",
    thaliSets = "thaliSets",
    books = "books",
    pujaEssentials = "pujaEssentials",
    flowers = "flowers"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, category: ProductCategory, description: string, price: bigint, unit: string, inStock: boolean, occasionTag: string | null): Promise<void>;
    addReview(productId: bigint, rating: bigint, comment: string): Promise<void>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    ensureCallerIsUser(): Promise<void>;
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getMyOrders(): Promise<Array<Order>>;
    getPanditAvailabilities(): Promise<Array<PanditAvailability>>;
    getProductReviews(productId: bigint): Promise<Array<Review>>;
    getProductsByCategory(category: ProductCategory): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(customerName: string, address: string, phone: string): Promise<void>;
    removeFromCart(productId: bigint): Promise<void>;
    removeProduct(id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setPanditAvailability(panditId: string, available: boolean): Promise<void>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
    updateProduct(id: bigint, name: string, category: ProductCategory, description: string, price: bigint, unit: string, inStock: boolean, occasionTag: string | null): Promise<void>;
}
