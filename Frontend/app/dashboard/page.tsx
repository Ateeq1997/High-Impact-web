import CardPlaceholder from "@/components/home/CardPlaceholder";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <CardPlaceholder title="My Parcels" description="View and manage your parcels." />
          <CardPlaceholder title="Insights" description="Get analytical insights about your projects." />
          <CardPlaceholder title="Chatbot" description="Interact with our farming assistant." />
          <CardPlaceholder title="Settings" description="Manage your account and preferences." />
          <CardPlaceholder title="Map" description="Visualize parcels with interactive maps." />
          <CardPlaceholder title="Notifications" description="See all system notifications and updates." />
        </div>
      </main>
      <Footer />
    </div>
  );
}
