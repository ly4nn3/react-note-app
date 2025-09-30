# Overview

This project is a single-page note-taking application built with React and TypeScript.
The goal is to create an offline-first writing environment inspired by apps like Bear and VSCode.
The app features a dual-sidebar layout: a narrow shortcut bar for quick actions and a resizable directory explorer for browsing notes and folders.
The main editor provides a clean space for writing and will eventually include features such as auto-saving, search, and tagging.

To run the project locally:
1. Clone this repository.
2. Install dependencies with `npm install` or `pnpm install`.
3. Start the development server with `npm run dev` or `pnpm run dev`.
4. Open your browser to the port shown in the terminal, e.g: `http://localhost:5173`.

The purpose of this software is to strengthen my skills in building React SPAs, managing state with React Context, and working with browser-based persistence via IndexedDB.

[Software Demo Video - In progress]()

# Web Pages

This application is structured as a single-page application (SPA).
Instead of traditional pages, it relies on components that dynamically render content:

**Shortcut Bar**:
- A narrow, VSCode/Obsidian-style bar for quick actions.
- Create a new note or folder, accessing settings, or switching to a list of favorite folders or files.

**Directory Sidebar**:
- An expandable and resizable sidebar that displays the folder and note structure.
- Notes and folders here will be dynamically loaded from IndexedDB.

**Note Editor**:
- The main writing area where users can view and edit their notes.
- The content displayed is based on the currently selected note in the directory.

# Development Environment

This project was developed using:

- **IDE/Editor**: VSCode  
- **Languages**: TypeScript, CSS (via CSS Modules)  
- **Framework**: React (with Vite as the build tool)  
- **Storage**: IndexedDB (via the `idb` library)  
- **Version Control**: Git + GitHub  

# Useful Websites

- [Learn React](https://react.dev/learn) 
- [How to Create a React App](https://www.codecademy.com/courses/learn-react-introduction/articles/how-to-create-a-react-app)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context#context-an-alternative-to-passing-props)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

# Future Work

**Core Phases**

<details>
<summary>Phase 1: Scaffolding & Layout ✅</summary>

- Set up React components and containers
- Create dual sidebars (shortcut bar + directory explorer)
- Add note editor area
</details>

<details>
<summary>Phase 2: State Management ✅</summary>

- Implement React Context for global state
- Manage selected note and folder states
- Connect UI interactions to state changes
</details>

<details>
<summary>Phase 3: IndexedDB Integration ✅</summary>

- Set up IndexedDB with `idb` library
- Store and retrieve notes/folders
- Create new notes and folders
</details>


<details>
<summary>Phase 4: Core Features ✅</summary>

- Delete/Rename notes and folders
- Resize sidebars via drag
- Expand/collapse folders
- Confirmation before deletion
</details>

<details>
<summary>Phase 5: Styling & Polish ✅</summary>

- Hover states and transitions
- Icons and visual hierarchy
- Consistent component styling
- Responsive behavior
</details>

---

**Enhancement Phases (ENH)**


<details open>
<summary>ENH 1: Core Features</summary>

- Auto-save notes while typing
- Allow directory sidebar resizing
- Add basic note search
</details>

<details open>
<summary>ENH 2: Advanced Features</summary>

- Tagging system for notes
- Favorite folders and files
- Dark/light theme switching
</details>


<details open>
<summary>ENH 3: Future Plans</summary>

- Cloud sync and backup options
- Import/export notes
- Polished UI and performance optimizations
</details>