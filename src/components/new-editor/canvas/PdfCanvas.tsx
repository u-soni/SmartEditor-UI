// @ts-nocheck
import Loader from '../Loader'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Document, Page } from 'react-pdf'

function PdfCanvas({
  editor,
  isDocLoading,
  pageDimensions,
  changePage,
  setPageDimensions,
  initCanvas,
  setIsDocLoading,
}: any) {
  function onDocumentLoadSuccess({
    numPages,
    originalHeight,
    originalWidth,
  }: any) {
    editor.setEdits([])
    editor.setNumPages(numPages)
    editor.setCurrPage(1)

    // Calculate dimensions
    const maxWidth = window.innerWidth * 0.4 // Adjust the scale factor as needed
    const scaleFactor = maxWidth / originalWidth
    const width = originalWidth * scaleFactor
    const height = originalHeight * scaleFactor

    setPageDimensions({ width, height })
    editor.addPdfDimensions({ width, height })
    editor.setCanvas(initCanvas(width, height))
    setTimeout(() => setIsDocLoading(false), 1000)
  }

  return (
    <div
      className={`flex flex-col mx-auto items-center justify-center w-full ${editor.theme ? 'bg-[rgb(20,20,20)] text-white' : 'bg-white text-black'}`}
      style={{
        minHeight: '100vh', // Ensure the component takes full viewport height
        paddingTop: '20px', // Add padding to prevent overflow from the top
        boxSizing: 'border-box',
      }}
    >
      <div
        className={`flex items-center justify-center ${editor.theme ? 'bg-[rgb(20,20,20)] text-white' : 'bg-white text-black'}`}
      >
        <div
          id='singlePageExport'
          className={`relative flex items-center justify-center ${editor.theme ? 'bg-[rgb(20,20,20)] text-white' : 'bg-white text-black'}`}
          style={{
            maxWidth: '100%',
            // overflow: 'hidden',
          }}
        >
          {isDocLoading && (
            <>
              <div className='fixed top-0 z-[1001] h-full w-full bg-[rgba(50,50,50,0.2)] backdrop-blur-sm'></div>
              <div className='fixed top-0 z-[1100] flex h-full w-full items-center justify-center'>
                <Loader />
              </div>
            </>
          )}
          <Document
            file={editor.selectedFile}
            onLoadSuccess={(pdf) =>
              pdf.getPage(editor.currPage).then((page) =>
                onDocumentLoadSuccess({
                  numPages: pdf.numPages,
                  originalHeight: page.view[3],
                  originalWidth: page.view[2],
                })
              )
            }
            className='flex justify-center mb-20'
            id='doc'
          >
            <div
              className='absolute z-[9] px-4 py-4'
              id='canvasWrapper'
              style={{
                visibility: 'visible',
              }}
            >
              <canvas id='canvas' />
            </div>
            <div
              id='pdfWrapper'
              className={`px-4 py-4 ${!editor.isExporting && editor.theme ? 'border-none bg-[rgb(25,25,25)] shadow-[0px_0px_16px_rgb(0,0,0)]' : 'border shadow-lg'}`}
            >
              <Page
                pageNumber={editor.currPage}
                id='docPage'
                width={pageDimensions.width}
                height={pageDimensions.height}
              />
            </div>
          </Document>
        </div>
      </div>
      <div className='fixed bottom-2 z-50 flex w-full items-center justify-center gap-3'>
        {editor.currPage > 1 && (
          <button
            onClick={() => changePage(-1)}
            className='rounded-md bg-gray-800 px-4 py-2 text-white'
          >
            <ChevronLeft />
          </button>
        )}
        <div className='rounded-md bg-gray-800 px-4 py-2 text-white'>
          Page {editor.currPage} of {editor.numPages}
        </div>
        {editor.currPage < editor.numPages && (
          <button
            onClick={() => changePage(1)}
            className='rounded-md bg-gray-800 px-4 py-2 text-white'
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  )
}

export default PdfCanvas
