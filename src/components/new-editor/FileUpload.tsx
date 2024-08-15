// @ts-nocheck
import ExtendedToolbar from '../WhiteBoard/components/ExtendedToolbar'
import { useEditor } from './CanvasContext'
import Components from './Components'
import Loader from './Loader'
import * as fabric from 'fabric'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export default function FileUpload() {
  const editor = useEditor()

  const [isDocLoading, setIsDocLoading] = useState(false)
  const [showExtendedToolbar, setShowExtendedToolbar] = useState(true)
  const [pageDimensions, setPageDimensions] = useState({
    width: 1000,
    height: 820,
  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      setIsDocLoading(true)
      editor.setFile(files[0])
    },
  })

  function onDocumentLoadSuccess({ numPages, originalHeight, originalWidth }) {
    editor.setEdits({})
    editor.setNumPages(numPages)
    editor.setCurrPage(1)

    // Set page dimensions for canvas
    setPageDimensions({ width: originalWidth, height: originalHeight })

    editor.setCanvas(initCanvas(originalWidth, originalHeight))
    setTimeout(() => setIsDocLoading(false), 2000)
  }

  function changePage(offset) {
    const page = editor.currPage
    editor.edits[page] = editor.canvas.toObject()
    editor.setEdits(editor.edits)
    editor.setCurrPage((page) => page + offset)
    editor.canvas.clear()
    editor.edits[page + offset] &&
      editor.canvas.loadFromJSON(editor.edits[page + offset])
    editor.canvas.renderAll()
  }

  const initCanvas = (width, height) => {
    return new fabric.Canvas('canvas', {
      isDrawingMode: false,
      height: height,
      width: width,
      backgroundColor: 'rgba(0,0,0,0)',
      selectionBorderColor: 'black',
    })
  }

  const toggleExtendedToolbar = () => {
    setShowExtendedToolbar((prev) => !prev)
  }

  return (
    <div className='flex w-full justify-center'>
      {editor.selectedFile && (
        <Components toggleExtendedToolbar={toggleExtendedToolbar} />
      )}
      {editor.selectedFile ? (
        <div
          className={`flex flex-col items-center justify-center w-full ${
            editor.theme
              ? 'bg-[rgb(20,20,20)] text-white'
              : 'bg-white text-black'
          }`}
        >
          <div
            className={`flex items-center justify-center ${
              editor.theme
                ? 'bg-[rgb(20,20,20)] text-white'
                : 'bg-white text-black'
            }`}
          >
            <div
              id='singlePageExport'
              className={`relative flex items-center justify-center ${
                editor.theme
                  ? 'bg-[rgb(20,20,20)] text-white'
                  : 'bg-white text-black'
              }`}
            >
              {isDocLoading && (
                <>
                  <div className='fixed top-0 z-[1001] h-full w-full bg-[rgba(50,50,50,0.2)] backdrop-blur-sm'></div>
                  <div className='fixed top-0 z-[1100] flex h-full w-full items-center justify-center'>
                    <Loader color={'#606060'} size={120} stokeWidth={'5'} />
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
                className='flex justify-center'
                id='doc'
              >
                <div
                  className='absolute z-[9] px-4 py-4'
                  id='canvasWrapper'
                  style={{ visibility: 'visible' }}
                >
                  <canvas id='canvas' />
                </div>
                <div
                  className={`px-4 py-4 ${
                    !editor.isExporting && editor.theme
                      ? 'border-none bg-[rgb(25,25,25)] shadow-[0px_0px_16px_rgb(0,0,0)]'
                      : 'border shadow-lg'
                  }`}
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
      ) : (
        <div
          className='flex h-full w-full items-center justify-center py-8'
          {...getRootProps()}
        >
          <div className='flex h-[40vh] w-[40vw] items-center justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5'>
            <div className='space-y-1 text-center'>
              <div
                className={`text-md flex ${
                  editor.theme ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <label className='relative cursor-pointer rounded-md bg-transparent font-medium text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'>
                  <span>Upload a file</span>
                </label>
                <input
                  type='file'
                  className='sr-only'
                  accept='application/pdf'
                  {...getInputProps()}
                />
                <p className='pl-1'>or drag and drop</p>
              </div>
              <p className='text-sm'>PDF</p>
            </div>
          </div>
        </div>
      )}
      {editor.selectedFile && showExtendedToolbar && (
        <ExtendedToolbar toggleExtendedToolbar={toggleExtendedToolbar} />
      )}
    </div>
  )
}
