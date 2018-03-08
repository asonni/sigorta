import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';

export default orderObj => {
  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  const {
    dob,
    plan,
    name,
    phone,
    gender,
    address,
    passport,
    createdAt,
    fatherName,
    motherName,
    nationality,
    numberOfYears,
    fatherPassport,
    motherPassport
  } = orderObj;

  const capitalizeFirstLetter = string =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const documentDefinition = {
    pageSize: 'A4',
    content: [
      {
        columns: [
          {
            text: `${moment(createdAt).format('MMMM DD, YYYY')}`,
            alignment: 'left',
            fontSize: 9
          },
          {},
          {}
        ]
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 15,
            x2: 515,
            y2: 15,
            lineWidth: 0.5,
            lineColor: 'black'
          }
        ]
      },
      '\n',
      {
        columns: [
          {
            text: `Plan Name: ${plan.name}`,
            style: 'invoiceBillingDetails'
          },
          {
            text: `Number of Years: ${
              numberOfYears === 1 ? 'One Year' : 'Two Years'
            }`,
            style: 'invoiceBillingDetails'
          }
        ]
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 15,
            x2: 515,
            y2: 15,
            lineWidth: 0.5,
            lineColor: 'black'
          }
        ]
      },
      '\n',
      {
        columns: [
          {
            text: `Name: ${name}`,
            style: 'invoiceBillingDetails'
          },
          {
            text: `Gender: ${capitalizeFirstLetter(gender)}`,
            style: 'invoiceBillingDetails'
          },
          {
            text: `Nationality: ${nationality}`,
            style: 'invoiceBillingDetails'
          }
        ]
      },
      {
        columns: [
          {
            text: `Passport: ${passport.toUpperCase()}`,
            style: 'invoiceBillingDetails'
          },
          {
            text: `Date of Birth: ${moment(dob).format('MMMM DD, YYYY')}`,
            style: 'invoiceBillingDetails'
          },
          {
            text: `Phone: ${phone}`,
            style: 'invoiceBillingDetails'
          }
        ]
      },
      {
        columns: [
          {
            text: `Address: ${address}`,
            style: 'invoiceBillingDetails'
          }
        ]
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 15,
            x2: 515,
            y2: 15,
            lineWidth: 0.5,
            lineColor: 'black'
          }
        ]
      },
      '\n',
      {
        columns: [
          {
            text: `Father Name: ${fatherName ? fatherName : 'N/A'}`,
            style: 'invoiceBillingDetails'
          },
          {
            text: `Mother Name: ${motherName ? motherName : 'N/A'}`,
            style: 'invoiceBillingDetails'
          }
        ]
      },
      {
        columns: [
          {
            text: `Passport: ${
              fatherPassport ? fatherPassport.toUpperCase() : 'N/A'
            }`,
            style: 'invoiceBillingDetails'
          },
          {
            text: `Passport: ${
              motherPassport ? motherPassport.toUpperCase() : 'N/A'
            }`,
            style: 'invoiceBillingDetails'
          }
        ]
      }
    ],
    styles: {
      // Document Header
      headerStyle: {
        bold: true,
        fontSize: 16,
        alignment: 'center',
        margin: [0, -5, 0, 0]
      },
      // Billing Details
      invoiceBillingDetails: {
        alignment: 'left',
        margin: [0, 0, 0, 5]
      }
    },
    defaultStyle: {
      fontSize: 11,
      columnGap: 20
    }
  };

  pdfMake.createPdf(documentDefinition).open();
};
