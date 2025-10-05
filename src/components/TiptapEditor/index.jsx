import React, { useEffect, useRef, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import toast from 'react-hot-toast'
import { imageApi } from '../../apis/image.api'
import Toolbar from './Toolbar'
import Link from '@tiptap/extension-link'

import './style.scss'

const TiptapEditor = ({ value, onChange, error, editable = true }) => {
  const fileInputRef = useRef(null)

  const editor = useEditor({
    editable: editable,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: true,
          autolink: true,
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: false,
      }),
    ],
    content: typeof value === 'string' && value ? JSON.parse(value) : value || '',
    editorProps: {
      attributes: {
        class: `tiptap-editor ${error ? 'tiptap-error' : ''}`,
      },
      handleDrop: (view, event, slice, moved) => {
        if (!editable || moved || !event.dataTransfer || !event.dataTransfer.files.length) {
          return false
        }
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file.type.startsWith('image/')) {
          handleImageUpload(file)
          return true
        }
        return false
      },
    },
    ...(onChange && {
      onUpdate: ({ editor }) => {
        onChange(editor.getJSON())
      },
    }),
  })

  useEffect(() => {
    if (editor && value) {
      const editorJson = JSON.stringify(editor.getJSON())
      const valueJson = typeof value === 'string' ? value : JSON.stringify(value)
      if (editorJson !== valueJson) {
        const contentToSet = typeof value === 'string' ? JSON.parse(value) : value
        editor.commands.setContent(contentToSet, false)
      }
    }
  }, [value, editor])

  const handleImageUpload = async (file) => {
    const uploadToast = toast.loading('Đang tải ảnh lên...')
    try {
      const { imageUrl } = await imageApi.uploadImage(file)
      if (imageUrl && editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run()
      }
      toast.success('Tải ảnh lên thành công!', { id: uploadToast })
    } catch (err) {
      toast.error('Tải ảnh lên thất bại.', { id: uploadToast })
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
    if (event.target) {
      event.target.value = ''
    }
  }

  const handleImageButtonClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div>
      {editable && <Toolbar editor={editor} onImageUploadClick={handleImageButtonClick} />}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        accept='image/png, image/jpeg, image/gif, image/webp'
      />

      <EditorContent editor={editor} />
      {error && <p className='error-message'>{error.message}</p>}
    </div>
  )
}

export default TiptapEditor
