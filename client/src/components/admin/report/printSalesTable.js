import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

export default salesObj => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  let array = [];
  const formattedData = (mainObj, cb) => {
    let arr = [];
    mainObj.sales.forEach((saleItem, saleIndex) => {
      mainObj.clients.forEach((clientItem, clientIndex) => {
        if (clientItem._id === saleItem.client) {
          const { day, month, year, hour } = saleItem.date;
          arr.push([
            { text: clientIndex + 1 },
            { text: clientItem.name },
            { text: `${clientItem.balance}TR` },
            { text: `${clientItem.discount}%` },
            { text: `${saleItem.totalPrice}TR` },
            { text: `${saleItem.totalPriceAfterDiscount}TR` },
            {
              text: `${day ? (day.length > 1 ? `${day}/` : `0${day}/`) : ''}${
                month ? (month.length > 1 ? `${month}/` : `0${month}/`) : ''
              }${year} ${
                hour ? (hour >= 12 ? `${hour}:00` : `0${hour}:00`) : ''
              }`
            },
            { text: `${clientItem.user.fname} ${clientItem.user.lname}` },
            { text: clientItem.user.email }
          ]);
          if (saleIndex === mainObj.sales.length - 1) {
            cb(arr);
          }
        }
        if (saleIndex === mainObj.sales.length - 1) {
          cb(arr);
        }
      });
    });
  };

  formattedData(salesObj, result => {
    array = result;
  });

  const documentDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content: [
      {
        columns: [
          {
            text: `
              Report Type: ${
                salesObj.dateType === 'day'
                  ? 'Daily'
                  : salesObj.dateType === 'month'
                    ? 'Monthly'
                    : salesObj.dateType === 'year' ? 'Yearly' : null
              }
              Date From: ${moment(salesObj.from).format('MMMM DD, YYYY')}
              Date To: ${moment(salesObj.to).format('MMMM DD, YYYY')}
              `,
            alignment: 'left',
            bold: true
          },
          { text: 'Sigorta Sales Report', style: 'headerStyle' },
          {}
        ]
      },
      '\n',
      {
        table: {
          headerRows: 1,
          dontBreakRows: true,
          widths: [30, 'auto', 80, 80, 80, 110, 80, 'auto', 'auto'],
          body: [
            [
              { text: '#', style: 'tableHeader' },
              { text: 'Client Name', style: 'tableHeader' },
              { text: 'Client Balance', style: 'tableHeader' },
              { text: 'Client Discount', style: 'tableHeader' },
              { text: 'Total Price', style: 'tableHeader' },
              { text: 'Total Price After Discount', style: 'tableHeader' },
              { text: 'Created Date/Hour', style: 'tableHeader' },
              { text: 'User Name', style: 'tableHeader' },
              { text: 'User Email', style: 'tableHeader' }
            ],
            ...array
          ]
        },
        layout: {
          hLineColor: i =>
            i === 0 || i === 1 || i === 10 + 1 ? 'black' : '#aaa',
          fillColor: (i, node) => (i % 2 === 0 ? '#CCCCCC' : null)
        }
      },
      '\n',
      {
        table: {
          headerRows: 1,
          widths: [140, 140],
          body: [
            [
              {
                text: 'Total Price',
                alignment: 'center',
                bold: true,
                fontSize: 10
              },
              {
                text: `${salesObj.totalPriceSum}TR`,
                alignment: 'center',
                bold: true,
                fontSize: 10
              }
            ],
            [
              {
                text: 'Total Price After Discount',
                alignment: 'center',
                bold: true,
                fontSize: 10
              },
              {
                text: `${salesObj.totalPriceAfterDiscountSum}TR`,
                alignment: 'center',
                bold: true,
                fontSize: 10
              }
            ]
          ]
        }
      }
    ],
    styles: {
      headerStyle: {
        bold: true,
        fontSize: 16,
        margin: [0, 15, 0, 0]
      }
    },
    defaultStyle: {
      fontSize: 9,
      alignment: 'center'
    }
  };

  pdfMake.createPdf(documentDefinition).open();
};
