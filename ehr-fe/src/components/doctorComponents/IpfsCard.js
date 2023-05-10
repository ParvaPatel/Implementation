import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getFileFromIpfs from '../../utils/getFileFromIpfs';
import { Document, Page, pdfjs } from 'react-pdf';
import CodeModal from '../CodeModal';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



const IpfsCard = (props) => {
    const ipfsHash = props.ipfsHash;
    const ipfs = props.ipfs;
    const num = props.num;
    const [data, setData] = useState(null);
    const [url, setUrl] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [code, setCode] = useState("");
    const [modalOpen, setModalOpen] = useState(false);


    const fetchData = async (code) => {
        const response = await getFileFromIpfs({ipfsHash,ipfs,code});
        setData(response);
        const url = URL.createObjectURL(response);
        setUrl(url);
    }
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    const toggleVisibility =async () => {
        Promise.all(fetchData());
        setIsVisible(!isVisible);
    }
    function goToPreviousPage() {
        setPageNumber(prevPageNumber => prevPageNumber - 1);
    }
    function goToNextPage() {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
    // useEffect(() => {
    //     fetchData();
    // }, []);

    const openModal = () => {
        setData(null);
        setUrl(null);
        if(!isVisible){
            setModalOpen(true);
        }
        else{
            setIsVisible(!isVisible);
        }
    };
    
    const closeModal =async () => {
        Promise.all(fetchData(code));
        setIsVisible(!isVisible);
        setModalOpen(false);
    };




    // const num = props.num
    return (
        <>
            <tr onClick={openModal}>
                <th>File - {num}</th>
                {/* <th>{ipfsHash}</th> */}
            </tr>
           <CodeModal code={code} modalOpen={modalOpen} closeModal={closeModal} setCode={setCode}/>
            {isVisible ?
                
                <tr>
                    <th colSpan={2}>
                        <Document file={url} onLoadSuccess={onDocumentLoadSuccess} renderMode={"canvas"}>
                            {/* {Array.from(new Array(numPages), (el, index) => (
                                        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                    ))} */}
                            <Page size="A4" style={{ justifyContent: 'center' ,height:'auto', backgroundColor:'red'}} pageNumber={pageNumber} className="custom-page-class" renderAnnotationLayer={false} renderTextLayer={false} />
                            {/* <canvas class="react-pdf__Page__canvas" dir="ltr" width="810" height="607" style="display: block; user-select: none; width: 720px; height: 540px;"></canvas>            */}
                        </Document>
                        {numPages &&
                            <>
                                <p>Page {pageNumber} of {numPages}</p>
                                <button type="button" className='mx-2 p-1 btn btn-outline-dark' disabled={pageNumber <= 1} onClick={goToPreviousPage}>
                                    Previous Page
                                </button>
                                <button type="button" className='mx-2 p-1 btn btn-outline-dark' disabled={pageNumber >= numPages} onClick={goToNextPage}>
                                    Next Page
                                </button>
                            </>
                        }
                    </th>
                </tr>

                : null}
        </>
    );
}
export default IpfsCard;