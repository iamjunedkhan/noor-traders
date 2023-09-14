import React, { useState } from 'react';
import Papa from "papaparse";
import { Client, Databases, ID } from 'appwrite';
import { Line } from 'rc-progress';
function FileReaderCSV() {
    const [data, setData] = useState([]);
    const [productData, setProductData] = useState(null)
    const [progressPercent, setProgressPercent] = useState(0);
    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState(null);

    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        console.log('handleFile change ',e.target.files);
        setError("");
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension = inputFile?.type.split("/")[1];
            console.log('fileExtension ' + fileExtension);

            // If input type is correct set the state
            setFile(inputFile);
        }else{
            setFile(null);
        }
    };
    const handleParse = () => {
        console.log('the files is:',file);
        // If user clicks the parse button without
        // a file we show a error
        if (!file || file.length===0) return setError("Enter a valid file");
        setError(null);

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv?.data;
            //   console.log(parsedData);
            setProductData(pre=>parsedData);
            const columns = Object.keys(parsedData[0]);
            setData(columns);
            console.log('the product data lenght is : ');
            console.log(productData.length);
        };
        reader.readAsText(file);
    };

    const handleInsert = () => {
        setProgressPercent(0);
        if(!file|| file.length===0)
        return setError('Enter a valid file');
        console.log(productData);
        let client = new Client();
        client.setEndpoint('https://cloud.appwrite.io/v1').setProject('64f6adc42b561cc5b3df');
        let databases = new Databases(client);

        let count = 0;

        let length= productData.length-1;
        console.log(count);
        // console.log(jsonData);

        let interval = setInterval(() => {
            
            let jsonData = productData[count++];
            databases.createDocument('64f6b4537c577d1c6903', '64f6c0aee1c185505848', ID.unique(), jsonData)
                .then(res => {

                    console.log('record count processed ' + count);
                    console.log(res);
                }).catch(err => {
                    console.log('error occured at ' + count);
                    console.log(err);
                })
            setProgressPercent(Math.floor((count / length) * 100));
            if (count >=length)
                clearInterval(interval);
        }, 1500);

    }

    return (
        <div  style={{boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} className='p-12 rounded-lg' >
            <h1 className='text-2xl text-center my-4 font-semibold'>Add the data using CSV file.</h1>
            <label htmlFor="csvInput" className="block mb-2 text-lg font-medium text-gray-9" >
                Enter CSV File
            </label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            {error&&<p className='text-rose-600'>{error}</p>}
            <div className='my-3'>
                <Line strokeColor='#3B82F6' strokeWidth={4} percent={progressPercent} />
                <p> {progressPercent===100 ? 'Comleted.':'Please wait...'}</p>
            </div>
            <div>
                <button onClick={handleParse} className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Parse</button>
                <button onClick={handleInsert} className='m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Insert Data</button>
            </div>
            
        </div>
    );
}

export default FileReaderCSV