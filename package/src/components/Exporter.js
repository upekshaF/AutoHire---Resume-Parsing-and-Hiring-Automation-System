import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Report from './Report';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
  },
  footer: {
    textAlign: 'center',
  },
});

const SalesReportPDF = ({ reportData, companyDetails }) => (
  <PDFViewer width="1080px" height="720px">
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>{reportData.title}</Text>
          <Text>{reportData.description}</Text>
          <Text>{companyDetails.address}</Text>
        </View>
        <View style={styles.content}>
          <Text>Date   Product   Units Sold   Revenue</Text>
          {reportData.sales.map((sale, index) => (
            <Text key={index}>
              {sale.date}   {sale.product}   {sale.unitsSold}   {sale.revenue}
            </Text>
          ))}
        </View>
        <View style={styles.footer}>
          <Text>{companyDetails.name}</Text>
          <Text>{companyDetails.address}</Text>
          <Text>{companyDetails.phone}</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default SalesReportPDF;
