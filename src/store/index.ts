import annotationSlice from './slices/annotationSlice'
import authSlice from './slices/authSlice'
import configurationSlice from './slices/configurationSlice'
import projectModelSlice from './slices/projectModelSlice'
import projectSlice from './slices/projectSlice'
import sidebarSlice from './slices/sidebarSlice'
import superStructureSlice from './slices/superStructureSlice'
import templateSlice from './slices/templateSlice'
import { configureStore } from '@reduxjs/toolkit'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const store = configureStore({
  reducer: {
    auth: authSlice,
    annotations: annotationSlice,
    configurations: configurationSlice,
    project: projectSlice,
    template: templateSlice,
    sidebar: sidebarSlice,
    superStructure: superStructureSlice,
    projectModels: projectModelSlice,
  },
})
