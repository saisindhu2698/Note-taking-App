document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notesContainer');
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteModal = document.getElementById('noteModal');
    const modalTitle = document.getElementById('modalTitle');
    const noteTitle = document.getElementById('noteTitle');
    const noteDescription = document.getElementById('noteDescription');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const contactsContainer = document.getElementById('contactsContainer');
    const addContactBtn = document.getElementById('addContactBtn');
    const contactModal = document.getElementById('contactModal');
    const contactModalTitle = document.getElementById('contactModalTitle');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    const cancelContactBtn = document.getElementById('cancelContactBtn');
    const saveContactBtn = document.getElementById('saveContactBtn');
    const themeSelector = document.getElementById('themeSelector');
    const body = document.getElementById('body');
    let notes = [];
    let contacts = [];
    let editIndex = null;
    let editContactIndex = null;

    const renderNotes = () => {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'bg-white p-6 rounded-lg shadow-lg';
            noteElement.innerHTML = `
                <h3 class="text-xl font-semibold text-gray-800">${note.title}</h3>
                <p class="text-gray-600 mt-2">${note.description}</p>
                <p class="text-gray-500 text-sm mt-2">${note.timestamp}</p>
                <div class="flex justify-end mt-4">
                    <button class="text-blue-500 hover:text-blue-700 mr-2" onclick="editNote(${index})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="text-red-500 hover:text-red-700" onclick="deleteNote(${index})"><i class="fas fa-trash"></i> Delete</button>
                    <button class="text-green-500 hover:text-green-700" onclick="syncToCalendar(${index})"><i class="fas fa-calendar-alt"></i> Add to Calendar</button>
                    <button class="text-yellow-500 hover:text-yellow-700" onclick="syncToProjectManagement(${index})"><i class="fas fa-tasks"></i> Add to Project Management</button>
                    <button class="text-purple-500 hover:text-purple-700" onclick="syncToCollaboration(${index})"><i class="fas fa-users"></i> Add to Collaboration</button>
                </div>
            `;
            notesContainer.appendChild(noteElement);
        });
    };

    const renderContacts = () => {
        contactsContainer.innerHTML = '';
        contacts.forEach((contact, index) => {
            const contactElement = document.createElement('div');
            contactElement.className = 'bg-white p-6 rounded-lg shadow-lg';
            contactElement.innerHTML = `
                <h3 class="text-xl font-semibold text-gray-800">${contact.name}</h3>
                <p class="text-gray-600 mt-2">Email: ${contact.email}</p>
                <p class="text-gray-600 mt-2">Phone: ${contact.phone}</p>
                <div class="flex justify-end mt-4">
                    <button class="text-blue-500 hover:text-blue-700 mr-2" onclick="editContact(${index})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="text-red-500 hover:text-red-700" onclick="deleteContact(${index})"><i class="fas fa-trash"></i> Delete</button>
                </div>
            `;
            contactsContainer.appendChild(contactElement);
        });
    };

    const openModal = (isEdit = false) => {
        noteModal.classList.remove('hidden');
        if (isEdit) {
            modalTitle.textContent = 'Edit Note';
            noteTitle.value = notes[editIndex].title;
            noteDescription.value = notes[editIndex].description;
        } else {
            modalTitle.textContent = 'Add Note';
            noteTitle.value = '';
            noteDescription.value = '';
        }
    };

    const openContactModal = (isEdit = false) => {
        contactModal.classList.remove('hidden');
        if (isEdit) {
            contactModalTitle.textContent = 'Edit Contact';
            contactName.value = contacts[editContactIndex].name;
            contactEmail.value = contacts[editContactIndex].email;
            contactPhone.value = contacts[editContactIndex].phone;
        } else {
            contactModalTitle.textContent = 'Add Contact';
            contactName.value = '';
            contactEmail.value = '';
            contactPhone.value = '';
        }
    };

    const closeModal = () => {
        noteModal.classList.add('hidden');
    };

    const closeContactModal = () => {
        contactModal.classList.add('hidden');
    };

    const saveNote = () => {
        const title = noteTitle.value.trim();
        const description = noteDescription.value.trim();
        const timestamp = new Date().toLocaleString();
        if (!title || !description) {
            alert("Both title and description are required to save a note.");
            return;
        }
        if (editIndex !== null) {
            notes[editIndex] = { title, description, timestamp };
            editIndex = null;
        } else {
            notes.push({ title, description, timestamp });
        }
        renderNotes();
        closeModal();
    };

    const saveContact = () => {
        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const phone = contactPhone.value.trim();
        if (!name || !email || !phone) {
            alert("All fields are required to save a contact.");
            return;
        }
        if (editContactIndex !== null) {
            contacts[editContactIndex] = { name, email, phone };
            editContactIndex = null;
        } else {
            contacts.push({ name, email, phone });
        }
        renderContacts();
        closeContactModal();
    };

    window.editNote = (index) => {
        editIndex = index;
        openModal(true);
    };

    window.editContact = (index) => {
        editContactIndex = index;
        openContactModal(true);
    };

    window.deleteNote = (index) => {
        notes.splice(index, 1);
        renderNotes();
    };

    window.deleteContact = (index) => {
        contacts.splice(index, 1);
        renderContacts();
    };

    addNoteBtn.addEventListener('click', () => openModal());
    cancelBtn.addEventListener('click', closeModal);
    saveBtn.addEventListener('click', saveNote);
    addContactBtn.addEventListener('click', () => openContactModal());
    cancelContactBtn.addEventListener('click', closeContactModal);
    saveContactBtn.addEventListener('click', saveContact);

    window.showSection = (sectionId) => {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById(sectionId).classList.remove('hidden');
    };

    themeSelector.addEventListener('change', (event) => {
        body.className = event.target.value;
    });

    const handleHashChange = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
        } else {
            showSection('home');
        }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // Integration functions
    window.integrateCalendar = () => {
        alert('Integrating with Calendar Apps...');
        // Add your integration logic here
    };

    window.integrateProjectManagement = () => {
        alert('Integrating with Project Management Tools...');
        // Add your integration logic here
    };

    window.integrateCollaboration = () => {
        alert('Integrating with Collaboration Platforms...');
        // Add your integration logic here
    };

    window.syncToCalendar = (index) => {
        const note = notes[index];
        alert(`Syncing note "${note.title}" to Calendar Apps...`);
        // Add your sync logic here
    };

    window.syncToProjectManagement = (index) => {
        const note = notes[index];
        alert(`Syncing note "${note.title}" to Project Management Tools...`);
        // Add your sync logic here
    };

    window.syncToCollaboration = (index) => {
        const note = notes[index];
        alert(`Syncing note "${note.title}" to Collaboration Platforms...`);
        // Add your sync logic here
    };
});
