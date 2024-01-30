// cart.model.controller.ts
import Cart from "../../../model/cart/cart.model";
import ErrorHandler from "../../../error/errorHandler";

//Save cart
export const saveCart = async (cartData: Record<string, any>) => {
  try {
    const cart = new Cart(cartData);
    const savedCart = await cart.save();
    return await savedCart.populate("product");
  } catch (error: any) {
    throw new ErrorHandler(`Error saving cart: ${error.message}`, 400);
  }
};

//Fetch cart by user
export const fetchCartByUser = async (id: string) => {
  try {
    return await Cart.find({ user: id }).populate("product");
  } catch (error: any) {
    throw new ErrorHandler(
      `Error fetching cart by user: ${error.message}`,
      400,
    );
  }
};
//Delete cart item

export const deleteCart = async (cartId: string) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(cartId);
    if (!deletedCart) {
      throw new ErrorHandler("No cart found with this ID", 404);
    }
    return deletedCart;
  } catch (error: any) {
    throw new ErrorHandler(`Error deleting cart: ${error.message}`, 400);
  }
};

//Update cart item
export const updateCart = async (
  cartId: string,
  updateData: Record<string, any>,
) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(cartId, updateData, {
      new: true,
    });
    if (!updatedCart) {
      throw new ErrorHandler("No cart found with this ID", 404);
    }
    return await Cart.findById(updatedCart._id).populate("product");
  } catch (error: any) {
    throw new ErrorHandler(`Error updating cart: ${error.message}`, 400);
  }
};
