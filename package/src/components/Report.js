import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import axios from 'axios';

const styles = StyleSheet.create({
    page: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    salesReportViewer: {
        width: '210mm',
        height: '297mm',
        border: '1px solid #000',
        padding: '20px',
        boxSizing: 'border-box',
    },
    header: {
        backgroundColor: '#3498db',
        
        color: '#fff',
        padding: '20px',
    },
    headerContent: {
        textAlign: 'center',
        
    },
    content: {
        padding: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    tableCell: {
        flex: 1,
        textAlign: 'left',
        fontSize: 9, // Adjust the font size as needed,
    },
    tableCol: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
    footer: {
        backgroundColor: '#f1f1f1',
        padding: '20px',
        position: 'absolute', // Position the footer absolutely
        bottom: 0, // Attach the footer to the bottom
        width: '100%',
    },
});


const Report = () => {

    const companyDetails = {
        title: 'Resume Parser',
        description: 'Selected Candidate Details',
        phone: '123-456-7890',
    };
    
const [statusList, setStatusList] = useState([])
const fetchAllStatuses = async () => {
    try {
        const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getAllStatuses');
        setStatusList(response.data);
       
    } catch (error) {
        console.error('Error fetching skills:', error);
    }
};

    const [cvdata, setCVData] = useState([]);

    const fetchAllParsedCVs = async () => {
        try {
            const response = await axios.get('https://resume-parser-mw16.onrender.com/api/getAllParsedCvs');
            setCVData(response.data)
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching CV data:', error);
        }
    };

    useEffect(() => {
        fetchAllStatuses();
        fetchAllParsedCVs();
        
    }, []);


    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.salesReportViewer}>
                        <View style={styles.header}>
                            <View style={styles.headerContent}>
                                <Text>{companyDetails.title}</Text>
                                <Text>{companyDetails.description}</Text>
                                <Text>{companyDetails.address}</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <table style={styles.table}>
                                <thead>
                                    <View  style={styles.tableRow}>
                                        <Text style={styles.tableCell}>Name</Text>
                                        <Text style={styles.tableCell}>Email</Text>
                                        <Text style={styles.tableCell}>Mobile</Text>
                                        <Text style={styles.tableCell}>Points</Text>
                                        <Text style={styles.tableCell}>Status</Text>
                                        <Text style={styles.tableCell}>Feedback</Text>
                                    </View>
                                </thead>
                                <tbody>
                                
                                    {cvdata.map((item, index) => (
                                        <View key={index} style={styles.tableRow}>
                                            <Text style={[styles.tableCell,{ fontSize: 8 }]}>{item.name}</Text>
                                            <Text style={[styles.tableCell,{ fontSize: 6 }]}>{(item.email_addresses && item.email_addresses.length > 0) ? item.email_addresses[0] : 'N/A'}</Text>
                                            <Text style={styles.tableCell}>{(item.mobile_numbers && item.mobile_numbers.length > 0) ? item.mobile_numbers[0] : 'N/A'}</Text>
                                            <Text style={styles.tableCell}>{item.points != null ? item.points : 'N/A'}</Text>
                                            <Text style={styles.tableCell}>{statusList.find(status => status.id === item.status_id)?.hiring_status || 'N/A'}</Text>
                                            <Text style={styles.tableCell}>{item.feedback || 'N/A'}</Text>
                                        </View>
                                    ))}
                                </tbody>

                            </table>
                        </View>
                       
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default Report;
