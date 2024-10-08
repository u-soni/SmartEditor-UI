//@ts-nocheck
import NewTemplate from './Dialog/NewTemplate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ViewTypeButtons from '@/components/ui/view-type-buttons'
import { Grid2X2, List, Plus } from 'lucide-react'

const Header = ({
  setViewType,
  viewType,
  onHandleAddTemplate,
  search,
  setSearch,
}) => {
  const handleViewChange = (value) => {
    setViewType(value)
  }
  return (
    <div className='p-y-3 mt-4 flex w-full flex-row justify-between'>
      <Input
        placeholder='Search template...'
        className='w-[20vw]'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='flex flex-row items-center justify-end gap-2'>
        <Button
          onClick={onHandleAddTemplate}
          className='flex h-8 items-center justify-center gap-2 p-2'
        >
          New Template
          <Plus size={20} />
        </Button>
        <ViewTypeButtons
          handleViewChange={handleViewChange}
          viewType={viewType}
        />
      </div>
    </div>
  )
}

export default Header
