# Frontend Feature Development
This document explains the development of the frontend functionalities, how they are implemented in the application, and the current progress of these features according to the project planning.

The frontend is responsible for providing the user interface, handling user interactions, and communicating with the backend API.

The application was developed using Angular with Type
Script.


# Implemented Functionalities
The main functionality developed in this sprint is the file upload interface, which allows users to submit files that will be processed and stored by the backend.

The Upload page includes the following elements:

- Drag and drop file area
- File selection interface
- Upload button
- Information about allowed file formats
- Information about file size limitations
- Panel for upload history

The interface was designed to provide a simple and clear user experience, allowing users to easily understand how to submit files to the system.

Supported formats:

- .xlsx
- .csv


# Frontend Interaction With Backend
The frontend communicates with the backend using HTTP requests.

When a user uploads a file, the following process occurs:

```
Client selects file
      │
      ▼
Upload component receives file
      │
      ▼
Frontend service prepares request
      │
      ▼
HTTP request sent to backend API
      │
      ▼
Backend processes upload
      │
      ▼
Response returned to frontend
```

The request is sent to the following endpoint:

```
POST /upload
```

This endpoint is responsible for creating a new submission record in the backend system.


# Functional Progress
The development of the frontend features follows the project planning for Sprint 3, focusing on implementing the main interface required for file submission.

Current progress of the functionalities:

| Functionality | Status |
|------|------|
| Upload page layout | Implemented |
| Drag and drop upload area | Implemented |
| File selection | Implemented |
| Upload button | Implemented |
| File format validation | Implemented |
| Backend integration | Implemented |
| Upload history display | In development |

The system is currently capable of sending uploaded files to the backend API.


# Deviations From Original Plan
During the development process, some adjustments were made compared to the initial planning.

The Upload History section was originally planned to display previously uploaded files retrieved from the backend database. However, due to time constraints and prioritization of the main upload functionality, this section is currently implemented only as a visual component and will be connected to backend data in a future sprint.

Additionally, improvements related to error handling and user feedback messages are planned for future iterations.

These adjustments allowed the team to prioritize the core functionality of file submission and ensure successful integration with the backend system within the sprint timeline.


# Alignment With Project Architecture
The frontend functionalities were implemented following the architecture and coding standards defined earlier in the project documentation.

The implementation respects the following principles:

- Component-based structure, separating the interface into independent components.
- Service layer for backend communication, avoiding direct API calls inside components.
- Use of TypeScript interfaces for data structures.
- Clear separation between UI logic and service logic.

This structure ensures that the frontend remains organized, maintainable, and scalable as new features are added to the system.


# Running the Frontend
To run the frontend application locally, it is necessary to install the project dependencies and start the development server.

First, install the dependencies:

```bash
npm install
```

Then start the Angular development server:

```bash
ng serve
```

After running the command, the application will be available at:

```
http://localhost:4200
```

The frontend will automatically reload whenever changes are made to the source code.

For full system functionality, the backend server must also be running so that the frontend can communicate with the API endpoints responsible for handling file uploads.