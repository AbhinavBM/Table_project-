export interface FoodCategory {
  _id: string;
  food_Category: string;
  food_Category_id: string;
  __v: number;
}

export interface MData {
  _id: string;
  "Table 1": number;
  Address: string;
  membership_id: string;
  name: string;
  phoneNo: string;
  status: string;
}

export interface MemberData {
  success: boolean;
  data: MData[];
}

export interface Table {
  _id: string;
  tableNo: string;
  active: string;
  maxPeople: string;
  __v: number;
}

interface BaseEntity {
  _id: string;
  foodName: string;
  foodPrice: string;
  food_id: string;
  foodCategories: string;
  food_category_id: string;
  description: string;
  type: string;
}

// Extend BaseEntity for CartItem
export interface CartDishItem extends BaseEntity {
  quantity_bought: number;
}

// Extend BaseEntity for Drinks
export interface DrinksGET {
  drinkStatus: string;
  _id: string;
  drinkName: string;
  drinkNamePrice: string;
  drinkCategories: string;
  drinks_category_id: string;
  description?: string;
  drink_id: string;
  __v: number;
  filenames?: string;
}

export interface CartDrink {
  _id: string;
  drinkName: string;
  drinkNamePrice: string;
  drinkCategories: string;
  drinks_category_id: string;
  description?: string;
  drink_id: string;
  __v: number;
  quantity_bought: number;
}

// Extend BaseEntity for Dish
export interface Dish extends BaseEntity {
  foodStatus: string;
  filenames: string;
  food_category_id: string;
  __v: number;
}

export interface DishProps {
  foodName: string;
  foodPrice: string;
  food_id: string;
  foodCategories: string;
  description: string;
  filenames: string;
  type: string;
  food_category_id: string;
}

export interface DrinksCategory {
  _id: string;
  drinksCategory: string;
  drinks_Category_id: string;
  __v: number;
}

interface RejectedDishes {
  foodName: string;
  food_id: string;
  quantity: string;
  _id: string;
}

interface RejectedDrink {
  drinkName: string;
  quantity: string;
  drink_id: string;
  _id: string;
}
export interface RejectedOrder {
  _id: string;
  user_id: string;
  Orders_id: string;
  reason: string;
  drinks: RejectedDrink[];
  dishes: RejectedDishes[];
  rejectedItems_id: string;
  __v: number;
}

export interface DrinkManager {
  name?: string;
  phoneNo?: string;
  manager_id: string;
  kitchen: string;
  accepted: string;
  orderForPickup: string;
  rejectedItems_id: string;
  Orders_id: string;
}

export interface FoodCategory {
  food_Category: string;
  food_Category_id: string;
}

export interface FoodManager {
  name?: string;
  phoneNo?: string;
  manager_id: string;
  kitchen: string;
  accepted: string;
  orderForPickup: string;
  rejectedItems_id: string;
  Orders_id: string;
}

export interface Menu {
  food_id: string;
  drink_id: string;
}

export interface Order {
  status: string;
  drink_id: string;
  food_id: string;
  order_id: string;
}

export interface RejectedItems {
  food_id?: string;
  user_id?: string;
  drink_id?: string;
  rejectedItems_id: string;
  order_id?: string;
  reason?: string;
}

export interface Staff {
  name: string;
  phoneNo: string;
  tableNoAssigned: string;
  staff_id: string;
  Orders_id: string;
}

export interface CartItem {
  _id: string;
  foodCategories: string;
  foodName: string;
  foodPrice: string;
  food_category_id: string;
  food_id: string;
  type: string;
  quantity_bought: number;
}

export interface CartCard {
  _id: string;
  foodCategories: string;
  foodName: string;
  foodPrice: string;
  food_category_id: string;
  food_id: string;
  type: string;
  quantity_bought: number;
}

export interface FoodQty {
  [key: string]: number;
}

export interface UserState {
  username: string;
  phoneNumber: string;
  otp: string;
  user_id: string;
  tableNo: string;
  membership_id: string;
  member_name: string;
  member_phoneNo: string;
  donated?:boolean;
  donationAmt?:string;
}

export interface UserStateNotification {
  user_id: string;
  username: string;
  tableNo: string;
  otp: string;
  phoneNumber: string;
}

export interface OrderDish {
  foodName: string;
  food_id: string;
  quantity: string;
}

export interface OrderDrink {
  drinkName: string;
  quantity: string;
  drink_id: string;
}

export interface Orders {
  tableNo: string;
  user_id: string;
  member_name:string;
  otp: string;
  drinks?: OrderDrink[];
  dishes?: OrderDish[];
}

export interface Membership {
  rahil: string;
  name: string;
  membership_id: string;
  id: string;
  status: string;
}
export interface UserField {
  name: string;
  phoneNo: string;
  tableNo: string;
}

export interface UserResponse {
  otp: string;
  user_id: string;
  tableNo: string;
}

export interface VerifyRequest {
  user_id: string;
  otp: string;
}

export interface VerifyResponse {
  tableNo: string;
  user_id: string;
  otp: string;
  status: string;
}

export interface ResponseDataOrders {
  tableNo: string;
  active: string;
  user_id: string;
  orderStatus: string;
  drinks: Drink[];
  dishes: Dish[];
  _id: string;
  Orders_id: string;
  time1: string;
  date1: string;
  __v: number;
}

export interface Drink {
  drinkName: string;
  quantity: string;
  drink_id: string;
  _id: string;
  drink_item_active: string;
}

export interface BillDetails {
  otp: string;
  service_tax:string;
  DishItems: DishItem[];
  DrinkItems: DrinkItem[];
  grandTotal: number;
  dishTotal: number;
  drinkTotal: number;
  cgst: number;
  sgst: number;
  donationAmount:string;
}

interface DishItem {
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

interface DrinkItem {
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

export interface Dish {
  foodName: string;
  food_id: string;
  quantity: string;
  _id: string;
  dish_item_active: string;
}

// interface Drink {
//   _id: string;
//   drinkName: string;
//   drinkNamePrice: string;
//   drinkCategories: string;
//   drinks_category_id: string;
//   description?: string;
//   filenames?: string;
//   drink_id: string;
//   __v: number;
// }

// interface DrinksData {
//   drinks: Drink[];
// }

export interface Order_ {
  _id: string;
  tableNo: string;
  order_active: string;
  food_active: string;
  drink_active: string;
  user_id: string;
  orderStatus: string;
  foodOrderStatus: string;
  drinkOrderStatus: string;
  drinks?: Drink[];
  dishes?: Dish[];
  Orders_id: string;
  time1: string;
  date1: string;
  __v: number;
}

export interface GetOrderResponse {
  success: boolean;
  data: Order_[];
}