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
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Base64UploadAdapter,
  BlockQuote,
  BlockToolbar,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromMarkdownExperimental,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from 'ckeditor5';
import { ref, onMounted } from 'vue';

// CKEditor configuration
const LICENSE_KEY = '';
const editor = BalloonEditor;
const editorData = ref('<p>Hello from CKEditor 5 in Vue!</p>');
const editorConfig = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'showBlocks',
      'findAndReplace',
      'textPartLanguage',
      '|',
      'heading',
      'style',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      'code',
      'removeFormat',
      '|',
      'specialCharacters',
      'horizontalLine',
      'pageBreak',
      'link',
      'insertImage',
      'mediaEmbed',
      'insertTable',
      'highlight',
      'blockQuote',
      'codeBlock',
      'htmlEmbed',
      '|',
      'alignment',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      'outdent',
      'indent',
    ],
    shouldNotGroupWhenFull: false,
  },
  plugins: [
    AccessibilityHelp,
    Alignment,
    Autoformat,
    AutoImage,
    AutoLink,
    Autosave,
    Base64UploadAdapter,
    BlockQuote,
    BlockToolbar,
    Bold,
    CloudServices,
    Code,
    CodeBlock,
    Essentials,
    FindAndReplace,
    FontBackgroundColor,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlComment,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Mention,
    PageBreak,
    Paragraph,
    PasteFromMarkdownExperimental,
    PasteFromOffice,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    TodoList,
    Underline,
    Undo,
  ],
  blockToolbar: [
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bold',
    'italic',
    '|',
    'link',
    'insertImage',
    'insertTable',
    '|',
    'bulletedList',
    'numberedList',
    'outdent',
    'indent',
  ],
  fontFamily: {
    supportAllValues: true,
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true,
  },
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
      {
        model: 'heading5',
        view: 'h5',
        title: 'Heading 5',
        class: 'ck-heading_heading5',
      },
      {
        model: 'heading6',
        view: 'h6',
        title: 'Heading 6',
        class: 'ck-heading_heading6',
      },
    ],
  },
  htmlSupport: {
    allow: [
      {
        name: /^.*$/,
        styles: true,
        attributes: true,
        classes: true,
      },
    ],
  },
  image: {
    toolbar: [
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage',
    ],
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file',
        },
      },
    },
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  mention: {
    feeds: [
      {
        marker: '@',
        feed: [
          /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
        ],
      },
    ],
  },
  style: {
    definitions: [
      {
        name: 'Article category',
        element: 'h3',
        classes: ['category'],
      },
      {
        name: 'Title',
        element: 'h2',
        classes: ['document-title'],
      },
      {
        name: 'Subtitle',
        element: 'h3',
        classes: ['document-subtitle'],
      },
      {
        name: 'Info box',
        element: 'p',
        classes: ['info-box'],
      },
      {
        name: 'Side quote',
        element: 'blockquote',
        classes: ['side-quote'],
      },
      {
        name: 'Marker',
        element: 'span',
        classes: ['marker'],
      },
      {
        name: 'Spoiler',
        element: 'span',
        classes: ['spoiler'],
      },
      {
        name: 'Code (dark)',
        element: 'pre',
        classes: ['fancy-code', 'fancy-code-dark'],
      },
      {
        name: 'Code (bright)',
        element: 'pre',
        classes: ['fancy-code', 'fancy-code-bright'],
      },
    ],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
    ],
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
