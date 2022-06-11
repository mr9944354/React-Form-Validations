 
import './App.css';
import image from './construction.svg';
import { useState } from 'react';
import CardAnt from './card';


 
window.saveFile = function (bytesBase64, mimeType, fileName) {
  var fileUrl = "data:" + mimeType + ";base64," + bytesBase64;
  fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
          var link = window.document.createElement("a");
          link.href = window.URL.createObjectURL(blob, { type: mimeType });
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      });
  }

function App() {
  const [mydata, setMydata] = useState([]);
  const [items, setItems]=useState(
    {
      requestNo : new Date().getTime(),
      workOrderNo : new Date().getTime() + "#WO", // "16634343434#WO"
      jobtitle:"",
      requestedby: "", 
      collectionId : "AthanorSteel",
      address:"",
      zip:"",
      city:"",
      country:"",
      dateExpectedtoCompleteErection:"",
      dateExpectedtoCompleteDismantling:"",
      dimension:{
        length:"",
        width:"",
        height:"",
        volume:function(){
          return this.length * this.width * this.height
        }
      },
      scaffoldtype:"",
      materialcount:0
    })
       var data = {
      // Customize enables you to provide your own templates
      // Please review the documentation for instructions and examples
      "customize": {
          //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
      },
      "images": {
          // The logo on top of your invoice
          "logo": "https://i.pinimg.com/originals/99/8f/e7/998fe77b33f3847e17cc485c31da900c.png",
          // The invoice background
          "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
      },
      // Your own data
      "sender": {
          "company": "ATHANOR STEEL",
          "address": "Duraisamy Road,vadapalani",
          "zip": "600022",
          "city": "Chennai",
          "country": "India"
          //"custom1": "custom value 1",
          //"custom2": "custom value 2",
          //"custom3": "custom value 3"
      },
      // Your recipient
      "client": {
          "company": items.jobtitle,
          "address": items.address,
          "zip":items.zip,
          "city": items.city,
          "country": items.country
          // "custom1": "custom value 1",
          // "custom2": "custom value 2",
          // "custom3": "custom value 3"
      },
      "information": {
          // Invoice number
          "number": items.workOrderNo,
          // Invoice data
          "date": new Date(),
          // Invoice due date
          "due-date": new Date()
      },
      // The products you would like to see on your invoice
      // Total values are being calculated automatically
      "products": [
          {
              "quantity": items.materialcount,
              "description": items.scaffoldtype,
              "tax-rate": 1.5,
              "price": 450
          }
       
      ],
      // The message you would like to display on the bottom of your invoice
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      // Settings to customize your invoice
      "settings": {
          "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
          // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
          // "tax-notation": "gst", // Defaults to 'vat'
          // "margin-top": 25, // Defaults to '25'
          // "margin-right": 25, // Defaults to '25'
          // "margin-left": 25, // Defaults to '25'
          // "margin-bottom": 25, // Defaults to '25'
          // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
          // "height": "1000px", // allowed units: mm, cm, in, px
          // "width": "500px", // allowed units: mm, cm, in, px
          // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Translate your invoice to your preferred language
      "translate": {
          // "invoice": "FACTUUR",  // Default to 'INVOICE'
          // "number": "Nummer", // Defaults to 'Number'
          // "date": "Datum", // Default to 'Date'
          // "due-date": "Verloopdatum", // Defaults to 'Due Date'
          // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
          // "products": "Producten", // Defaults to 'Products'
          // "quantity": "Aantal", // Default to 'Quantity'
          // "price": "Prijs", // Defaults to 'Price'
          // "product-total": "Totaal", // Defaults to 'Total'
          // "total": "Totaal" // Defaults to 'Total'
      },
    };

     function handleExport(){
      easyinvoice.createInvoice(data, function (result) {
        // The response will contain a base64 encoded PDF file
        console.log('PDF base64 string: ', result.pdf);
        window.saveFile(result.pdf, "application/pdf", "something");
      })
     }
  async function handleReceiving() {
    let data = await fetch("https://rcz-vam-1.herokuapp.com/api/getregdata?fromCollectionId=AthanorSteel");
    setMydata(await data.json());
     }
  // async function handleReceiving() {    
  //   let MyData= await fetch("https://rcz-vam-1.herokuapp.com/api/getregdata?fromCollectionId=mohanSample");
  //   setMydata(await MyData.json());
    
  // }


    async function handleValidationAndSendData(){
      console.log(items);
      await fetch("https://rcz-vam-1.herokuapp.com/api/addregistration",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items),
    })
    }


  // function submit(){
  //   console.log(items);
  // }

  return (
     <div>
    <div className="container">
    <div className="row">
      <div className="col imagewidth">
        <img src={image} alt='background image' />
      </div>
      <div className="col formwidth">
          <div className="row g-4 newone">
            <div className='header'><h1>ORDER FORM</h1></div>   

            
            <div className="row g-3"> 
              <div className="col">
              <label   className="form-label">Job Title</label>
                <input type="text" onChange={(e) => {
                  setItems({...items, jobtitle:e.target.value })
                }}  className="form-control" placeholder="JOB TITLE" aria-label="JOB TITLE" />
              </div>
              <div className="col">
              <label   className="form-label">Requested-by</label>
                <input type="text" onChange={(e) => {
                  setItems({...items, requestedby:e.target.value })
                }}  className="form-control" placeholder="REQUESTED-BY" aria-label="REQUESTED-BY" />
              </div>
            </div>


            <div className="row g-3"> 
              <div className="col-12">   
              <label   className="form-label">Address</label>   
                <input type="text" onChange={(e) => {
                  setItems({...items, address: e.target.value })
                }} className="form-control" id="inputAddress" placeholder="ENTER YOUR ADDRESS" />
             </div>
            </div>


            <div className="row g-3"> 
              <div  className="col-sm">
              <label  className="form-label"> Zip</label>
                <input type="text" onChange={(e) => {
                  setItems({...items, zip: e.target.value })
                }}  className="form-control" placeholder="ZIP" aria-label='ZIP' />
              </div>
              <div  className="col-sm">
              <label   className="form-label"> City</label>
                <input type="text" onChange={(e) => {
                  setItems({...items, city: e.target.value })
                }}  className="form-control" placeholder="CITY" aria-label='CITY' />
              </div>
              <div  className="col-sm">
              <label  className="form-label">Country</label>
                <input type="text" onChange={(e) => {
                  setItems({...items, country: e.target.value })
                }}  className="form-control" placeholder="COUNTRY" aria-label='COUNTRY' />
              </div>
            </div>


            <div className="row g-3"> 
              <div className="col">
                <label  className="form-label">Date Expected To Complete Erection</label>
                <input type="date" onChange={(e) => {
                  setItems({...items, dateExpectedtoCompleteErection: e.target.value })
                }} className="form-control" />
              </div>
              <div className="col">
                <label  className="form-label">Date Expected To Complete Dismantaling</label>
                <input type="date" onChange={(e) => {
                  setItems({...items, dateExpectedtoCompleteDismantling: e.target.value })
                }} className="form-control" />
              </div>
            </div>


            <div className="row g-3"> 
            <label  className="form-label">Dimention</label>
              <div className="col-sm">
                <div className="input-group">
                  <div className="input-group-text">LENGTH</div>
                  <input type="text" onChange={e => {
                    setItems({...items, dimension: {...items.dimension, length: e.target.value } })
                  }} className="form-control" id="autoSizingInputGroup" />
                </div>
              </div>
              <div className="col-sm">
                <div className="input-group">
                  <div className="input-group-text">WIDTH</div>
                  <input type="text" onChange={e => {
                    setItems({...items, dimension: {...items.dimension, width: e.target.value } })
                  }} className="form-control" id="autoSizingInputGroup" />
                </div>
              </div>
              <div className="col-sm">
                <div className="input-group">
                  <div className="input-group-text">HEIGHT</div>
                  <input type="text" onChange={e => {
                    setItems({...items, dimension: {...items.dimension, height: e.target.value } })
                  }} className="form-control" id="autoSizingInputGroup" />
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className='col-sm'>
              <label className="form-label">Scaffold Type</label>
                <select onChange={(e) => {
                  setItems({ ...items, scaffoldtype: e.target.value })
                }} className="form-select" aria-label="Default select example">
                <option  >select menu</option>
                  <option>Scafold-long</option>
                  <option>scafold-medium</option>
                  <option>scafold-short</option>
                  <option>scafold-join</option>
              </select>
              </div>
              <div className='col-sm'>
              <label  className="form-label">Material-Count</label>
                <select onChange={(e) => {
                  setItems({...items, materialcount: e.target.value })
                }} className="form-select" aria-label="Default select example">
                <option  > select material</option>
                <option >1</option>
                <option >2</option>
                <option >3</option>
                <option >4</option>
                <option >5</option>
                <option >6</option>
              </select>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button onClick={()=>{handleValidationAndSendData()}} className="btn btn-outline-secondary but1">SUBMIT</button>
              <button  onClick={function(){handleExport();}} className="btn btn-outline-secondary but2">Export DATA</button>
                <button onClick={function(){}}  className="btn btn-outline-secondary but2">RESET</button>
                <button onClick={function(){handleReceiving()}} className="btn btn-outline-secondary but2">GET DATA</button>

              </div>
            </div>
          </div>
        </div>  
      </div>
      <br></br>
      <div className='cardHolder'>
      {
        mydata.map(e => (
          <CardAnt datacollection={e}/>
          
        ))
      }</div>
      </div> 
               
  );
}

export default App;
