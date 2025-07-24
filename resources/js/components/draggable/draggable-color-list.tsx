import { PaletteFormState } from "@/pages/palette-form"
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable"
import DraggableColorBox from "./draggable-color-box"

interface DraggableColorListProps {
  form: PaletteFormState
  deleteColor: (colorName: string) => void
  handleDragCancel: () => void
  handleDragEnd: (event: DragEndEvent) => void
  handleDragStart: (event: DragStartEvent) => void
}

export default function DraggableColorList({
  form,
  deleteColor,
  handleDragEnd,
  handleDragCancel,
  handleDragStart,
}: DraggableColorListProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={form.data.colors.map((color) => color.name)}
        strategy={rectSortingStrategy}
      >
        <div style={{ height: "100%" }}>
          {form.data.colors.map((color) => (
            <DraggableColorBox
              key={color.name}
              color={color.color}
              name={color.name}
              deleteColor={() => deleteColor(color.name)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
