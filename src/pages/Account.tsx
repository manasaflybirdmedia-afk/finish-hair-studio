import { Link } from "react-router-dom";
import { Package, User, CalendarCheck } from "lucide-react";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";

const orders = [
  { id: "FINIX-1042", item: "Mono System", status: "Fitting scheduled", date: "28 Apr 2026", total: "₹12,999" },
  { id: "FINIX-1038", item: "Tape Roll + Scalp Protector", status: "Delivered", date: "12 Apr 2026", total: "₹1,999" },
];

const Account = () => (
  <>
    <AnnouncementBar />
    <Header />
    <main className="container py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="border border-border rounded p-6 h-fit">
          <User className="w-8 h-8 text-gold mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">My Account</h1>
          <p className="font-body text-sm text-muted-foreground mb-6">Track orders, bookings, and fitting updates.</p>
          <Link to="/consultation" className="block bg-gold text-accent-foreground text-center py-3 rounded font-body font-bold hover:bg-gold-dark transition-colors">Book Service</Link>
        </aside>
        <section>
          <h2 className="font-display text-3xl font-bold mb-6">Order History</h2>
          <div className="space-y-4 mb-10">
            {orders.map((order) => (
              <div key={order.id} className="border border-border rounded p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Package className="w-6 h-6 text-gold mt-1" />
                  <div>
                    <p className="font-body font-bold">{order.item}</p>
                    <p className="font-body text-sm text-muted-foreground">{order.id} · {order.date}</p>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-body text-sm text-gold font-semibold">{order.status}</p>
                  <p className="font-body font-bold">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-charcoal text-background rounded p-6 flex items-center gap-4">
            <CalendarCheck className="w-8 h-8 text-gold" />
            <div>
              <h3 className="font-display text-xl font-bold">Next maintenance reminder</h3>
              <p className="font-body text-sm text-background/70">Book cleaning or refitting every 3–4 weeks for best performance.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
    <Footer />
    <CartDrawer />
  </>
);

export default Account;
