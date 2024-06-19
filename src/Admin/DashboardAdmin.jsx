
import DashboardStatsGrid from "./DashboardStatsGrid";


function DashboardAdmin() {
  return (
    <div className="flex flex-col gap-4 ">
      <DashboardStatsGrid />
      {/* <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyerProfileChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders />
        <PopularProducts />
      </div> */}
    </div>
  );
}

export default DashboardAdmin;
