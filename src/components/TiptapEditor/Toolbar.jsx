import React, { useCallback } from 'react'
import { Icon } from '@iconify/react'
import { FaBold, FaItalic, FaHeading, FaListUl, FaListOl, FaCode, FaLink } from 'react-icons/fa'

const Toolbar = ({ editor, onImageUploadClick }) => {
  if (!editor) {
    return null
  }

  const handleLink = useCallback(() => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
      return
    }
    const url = window.prompt('Enter URL')
    if (!url) {
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div className='tiptap-toolbar'>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
        <FaHeading />1
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
        <FaHeading />2
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}>
        <FaBold />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}>
        <FaItalic />
      </button>

      <button
        type='button'
        onClick={handleLink}
        className={editor.isActive('link') ? 'is-active' : ''}>
        <FaLink />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}>
        <FaListUl />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}>
        <FaListOl />
      </button>

      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}>
        <FaCode />
      </button>
      <button type='button' onClick={onImageUploadClick} className='tiptap-toolbar__img-button'>
        <Icon icon='material-symbols:image' />
      </button>
    </div>
  )
}

export default Toolbar
