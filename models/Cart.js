import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [{
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        productPrice: { type: String, required: false },
        quantity: { type: Number, required: true },
        productImage: { type: String, required: true }
    }]
  },
  {
    timestamps: true,
  }
);

const Cart =
  mongoose.models.Cart || mongoose.model('Cart', CartSchema);
export default Cart;