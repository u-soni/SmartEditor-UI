//@ts-nocheck
export const editorSteps = [
  {
    selector: '#canvas',
    content: 'This is the canvas',
  },
  {
    selector: '#total-pages',
    content: 'This is the total number of pages in the pdf',
  },
  {
    selector: '#zoom-in',
    content: 'This is the zoom in button',
  },
  {
    selector: '#zoom-out',
    content: 'This is the zoom out button',
  },
  {
    selector: '#rotate-ccw',
    content: 'This is to reset the zoom',
  },
  {
    selector: '#pan',
    content:
      'You can pan the canvas by dragging the mouse only when the canvas is in pan mode is on.',
  },
  {
    selector: '#saveAnnotations',
    content: 'This is the save annotations button',
  },
  {
    selector: '#Move',
    content: 'This is the Move button',
  },
  {
    selector: '#Text',
    content: 'This is the Text button',
  },
  {
    selector: '#Eraser',
    content: 'This is the Eraser button',
  },
  {
    selector: '#Annotate',
    content: 'This is the Annotate button',
  },
  {
    selector: '#Clear',
    content: 'This is the Clear button',
  },
  {
    selector: '#Download-JSON',
    content: 'This is the Download JSON button',
  },
  {
    selector: '#Download-Image',
    content: 'This is the Download Image button',
  },
  {
    selector: '#Download-PDF',
    content: 'This is the Download PDF button',
  },
  {
    selector: '#toolbar',
    content: 'This is the toolbar',
  },
  {
    selector: '#back',
    content: 'This is the back button',
  },
  {
    selector: '#project-model-toolbar',
    content:
      'This is the project model toolbar. From here you can update the pdf , or mark the pdf as completed or skipped',
  },
  {
    selector: '#project-model-select',
    content: 'From here you can switch between the different project models',
  },
]

export const projectModelTour = [
  {
    selector: '#project-model-card',
    content:
      'This is the project model card. From here you can update the pdf , or mark the pdf as completed or skipped',
  },
  {
    selector: '#complete-button',
    content: 'This is the complete button',
  },
  {
    selector: '#skip-button',
    content: 'This is the skip button',
  },
  {
    selector: '#edit-button',
    content: 'This is the edit button',
  },
]

export const projectsTour = [
  {
    selector: '#new-project',
    content: 'Click here to create a new project',
  },
]

export const customStyles = {
  popover: (base) => ({
    ...base,
    backgroundColor: '#172554',
    color: '#fff',
    borderRadius: '8px',
    padding: '20px',
    paddingTop: '40px',
    maxWidth: '500px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
  }),
  arrow: (base) => ({
    ...base,
    color: 'white',
  }),
  badge: (base) => ({
    ...base,
    display: 'none',
    backgroundColor: '#fff',
    color: '#000',
  }),
  close: (base) => ({
    ...base,
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '16px',
  }),
  dot: (base, { current }) => ({
    ...base,
    backgroundColor: current ? '#ef5a3d' : '#fff',
    borderRadius: '50%',
    margin: '0 6px',
    padding: '4px',
  }),
}
