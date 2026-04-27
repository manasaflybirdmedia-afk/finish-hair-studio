import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import { CheckCircle } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <div className="container py-20 text-center max-w-lg mx-auto">
          <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="font-body text-muted-foreground mb-8">
            Thank you for your order. We'll contact you at your phone number for confirmation. For any queries, contact Vamsi at +91 9705060222.
          </p>
          <Link to="/products" className="bg-gold text-accent-foreground px-8 py-3 rounded font-body font-semibold hover:bg-gold-dark transition-colors">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Your cart is empty</h1>
          <Link to="/products" className="text-gold font-body hover:underline">Continue Shopping</Link>
        </div>
        <Footer />
        <CartDrawer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="container py-8">
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-8">
          <Link to="/" className="hover:text-gold">Home</Link><span>/</span>
          <span className="text-foreground">Checkout</span>
        </div>

        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm font-medium mb-1 block">First Name *</label>
                  <input name="firstName" required value={form.firstName} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold transition-colors bg-background" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1 block">Last Name *</label>
                  <input name="lastName" required value={form.lastName} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold transition-colors bg-background" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1 block">Email *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold transition-colors bg-background" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1 block">Phone *</label>
                  <input name="phone" type="tel" required value={form.phone} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold transition-colors bg-background" />
                </div>
                <div className="md:col-span-2">
                  <label className="font-body text-sm font-medium mb-1 block">Address *</label>
                  <input name="address" required value={form.address} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold transition-colors bg-background" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1 block">City *</label>
                  <input name="city" required value={form.city} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold transition-colors bg-background" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1 block">State *</label>
                  <input name="state" required value={form.state} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold transition-colors bg-background" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium mb-1 block">Pincode *</label>
                  <input name="pincode" required value={form.pincode} onChange={handleChange} className="w-full border border-border rounded px-4 py-3 text-sm font-body outline-none focus:border-gold transition-colors bg-background" />
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: "cod", label: "Cash on Delivery" },
                  { value: "upi", label: "UPI Payment" },
                  { value: "card", label: "Credit/Debit Card" },
                ].map((method) => (
                  <label key={method.value} className={`flex items-center gap-3 p-4 border rounded cursor-pointer transition-colors ${form.paymentMethod === method.value ? "border-gold bg-gold/5" : "border-border hover:border-gold"}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={form.paymentMethod === method.value}
                      onChange={handleChange}
                      className="accent-[hsl(42,52%,56%)]"
                    />
                    <span className="font-body text-sm">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-40 lg:self-start">
            <div className="border border-border rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-body text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="font-body text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-body text-sm font-semibold text-gold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-gold">{totalPrice >= 10000 ? "Free" : "₹150"}</span>
                </div>
                <div className="flex justify-between font-body text-lg font-bold border-t border-border pt-3">
                  <span>Total</span>
                  <span>₹{(totalPrice + (totalPrice >= 10000 ? 0 : 150)).toLocaleString()}</span>
                </div>
              </div>
              <button type="submit" className="w-full bg-gold text-accent-foreground py-4 rounded font-body font-semibold mt-6 hover:bg-gold-dark transition-colors">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
};

export default Checkout;
