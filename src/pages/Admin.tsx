import { CalendarDays, Package, Users, Plus } from "lucide-react";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import { products } from "@/data/products";

const Admin = () => {
  const bookings = ["Hair system fixing — Rahul — 11:00 AM", "Maintenance — Amit — 03:00 PM", "Consultation — Sameer — 05:00 PM"];
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="container py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-3">Admin Panel</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold">Manage products and bookings</h1>
          </div>
          <button className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-5 py-3 rounded font-body font-bold hover:bg-gold-dark transition-colors">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[{ label: "Products", value: products.length, icon: Package }, { label: "Bookings today", value: 3, icon: CalendarDays }, { label: "Customers", value: 128, icon: Users }].map(({ label, value, icon: Icon }) => (
            <div key={label} className="border border-border rounded p-5">
              <Icon className="w-6 h-6 text-gold mb-4" />
              <p className="font-display text-3xl font-bold">{value}</p>
              <p className="font-body text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="border border-border rounded p-6">
            <h2 className="font-display text-2xl font-bold mb-5">Product catalogue</h2>
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2">
              {products.slice(0, 12).map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-3 border-b border-border pb-3">
                  <div>
                    <p className="font-body text-sm font-bold">{product.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{product.category} · ₹{product.price.toLocaleString()}</p>
                  </div>
                  <button className="font-body text-xs text-gold hover:text-gold-dark">Edit</button>
                </div>
              ))}
            </div>
          </section>
          <section className="border border-border rounded p-6">
            <h2 className="font-display text-2xl font-bold mb-5">Booking queue</h2>
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking} className="bg-secondary rounded p-4 font-body text-sm">{booking}</div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
