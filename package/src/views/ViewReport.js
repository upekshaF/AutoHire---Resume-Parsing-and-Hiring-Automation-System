import React from "react";
import Report from "../components/Report";
import SalesReportPDF from '../components/Exporter.js';
const ViewReport = () => {
    
const salesReport = {
    title: 'Quarterly Sales Report',
    description: 'This report shows the quarterly sales data for our company.',
    sales: [
      { date: '2024-01-01', product: 'Product A', unitsSold: 100, revenue: 5000 },
      { date: '2024-01-02', product: 'Product B', unitsSold: 120, revenue: 6000 },
      // Add more sales data here
    ],
  };
  
  const companyDetails = {
    name: 'Your Company Name',
    address: '123 Main Street, City, Country',
    phone: '+1234567890',
  };
    return (<>
     <div className="row">
     <Report/>

     </div>
     {/* <div className="row">
    <SalesReportPDF reportData={salesReport} companyDetails={companyDetails} />
  </div> */}

  {/* <div>
    <SalesReportPDF  reportData={salesReport} companyDetails={companyDetails}/>
  </div>  */}
   
    </>

    )
}
export default ViewReport;