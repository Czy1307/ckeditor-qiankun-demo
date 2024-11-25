<template>
  <div style="padding: 0 30%">
    <div style="height: 50px">
      <div style="float: right">
        <el-button @click="handleSaveHTML" type="success">保存</el-button>
        <el-button @click="previewFullHTML" type="primary"
          >保存并预览完整页面</el-button
        >
      </div>
    </div>
    <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
  </div>
</template>

<script setup>
import {
  BalloonEditor,
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  Base64UploadAdapter,
  CloudServices,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation,
  BlockToolbar,
  Alignment,
  Font,
  ImageResize,
  ImageResizeEditing,
  ImageResizeHandles,
  HorizontalLine,
  LinkImage,
  HtmlEmbed,
} from 'ckeditor5';
import { ref, onMounted } from 'vue';

// CKEditor configuration
const LICENSE_KEY = '';
const editor = BalloonEditor;
const editorData = ref('<p>Hello from CKEditor 5 in Vue!</p>');
const editorConfig = {
  plugins: [
    Autoformat,
    BlockQuote,
    BlockToolbar,
    Bold,
    CloudServices,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    ImageResizeEditing,
    ImageResizeHandles,
    Base64UploadAdapter,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableToolbar,
    TextTransformation,
    Alignment,
    Font,
    HorizontalLine,
    LinkImage,
    HtmlEmbed,
    ...(LICENSE_KEY ? [SlashCommand] : []),
  ],
  licenseKey: LICENSE_KEY,
  blockToolbar: [
    'undo',
    'redo',
    '|',
    'heading',
    '|',
    'uploadImage',
    'insertTable',
    'blockQuote',
    'mediaEmbed',
    'horizontalLine',
    'htmlEmbed',
    '|',
    'bulletedList',
    'numberedList',
    'outdent',
    'indent',
    'alignment',
  ],
  toolbar: {},
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3',
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4',
      },
    ],
  },
  image: {
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        icon: 'original',
      },
      {
        name: 'resizeImage:custom',
        value: 'custom',
        icon: 'custom',
      },
      {
        name: 'resizeImage:50',
        value: '50',
        icon: 'medium',
      },
      {
        name: 'resizeImage:75',
        value: '75',
        icon: 'large',
      },
    ],
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      '|',
      'linkImage',
      'toggleImageCaption', // 切换图片标题
      'imageTextAlternative', // 替代文本
      '|',
      'ImageResize',
    ],
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

const handleSaveHTML = async () => {
  try {
    const editorContent = editorData.value;
    console.log('Editor Content:', editorContent);

    // Fetch the complete HTML template
    const response = await fetch('http://192.168.50.109:3030/api/html');
    if (!response.ok) {
      throw new Error(`Failed to fetch HTML file: ${response.statusText}`);
    }
    const rawHTML = await response.text();

    // Parse and modify the HTML
    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = rawHTML;

    const ckBar = tempDiv.querySelector('.ck-content');
    if (!ckBar) {
      console.error('Element with id "ckBar" not found.');
      return;
    }

    ckBar.innerHTML = editorContent;

    // Generate updated HTML
    const updatedHTML = `
      <!DOCTYPE html>
      <html>
        ${tempDiv.querySelector('head')?.outerHTML || ''}
        ${tempDiv.querySelector('body')?.outerHTML || tempDiv.innerHTML}
      </html>
    `;

    // Save updated HTML to the server
    const saveResponse = await fetch('http://192.168.50.109:3030/api/html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: updatedHTML }),
    });

    if (!saveResponse.ok) {
      throw new Error(`Failed to save HTML: ${saveResponse.statusText}`);
    }

    console.log('HTML saved successfully.');
  } catch (error) {
    console.error('Error saving HTML:', error);
  }
};

const previewFullHTML = async () => {
  try {
    // Save the current editor content before previewing
    await handleSaveHTML();

    // Open the preview page
    window.open('http://192.168.50.109:3030/pre.html', '_blank');
  } catch (error) {
    console.error('Error previewing HTML:', error);
  }
};

onMounted(async () => {
  // 编辑器实例化后加载初始 HTML
  // Fetch the complete HTML template
  const response = await fetch('http://192.168.50.109:3030/api/html');
  if (!response.ok) {
    throw new Error(`Failed to fetch HTML file: ${response.statusText}`);
  }
  const rawHTML = await response.text();

  // Parse and modify the HTML
  const tempDiv = document.createElement('div');

  tempDiv.innerHTML = rawHTML;

  const ckBar = tempDiv.querySelector('.ck-content');
  editorData.value = ckBar.innerHTML;
});
</script>
