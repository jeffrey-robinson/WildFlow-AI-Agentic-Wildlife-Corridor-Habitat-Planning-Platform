# 🌳 WildFlow AI — Agentic Wildlife Corridor & Habitat Planning Platform

**WildFlow AI** is a full-stack, AI-powered wildlife conservation and habitat planning platform designed to help conservation officers, researchers, forest departments, and environmental planners analyze wildlife habitats and identify potential wildlife corridors.

---

## 🌟 Key Features

- **Natural Language Conservation Analysis**: Describe conservation goals in plain English (e.g. *"Find three potential elephant corridors connecting two forest habitats while avoiding highways and villages"*).
- **AI Workflow Generator**: Transforms natural language queries into executable visual node workflows.
- **Visual Workflow Builder**: React Flow interactive canvas (`@xyflow/react`) supporting drag-and-drop, configuration inspector, minimap, save, duplicate, and execution controls.
- **8-Agent Execution Engine**:
  1. **Conservation Planner Agent**: Defines species profiles and study area bounds.
  2. **Habitat Analysis Agent**: Evaluates NDVI canopy density, water proximity, elevation slope, and computes Habitat Suitability Scores.
  3. **Habitat Fragmentation Agent**: Detects patch fragmentation, isolated island habitats, and barrier choke points.
  4. **Corridor Planning Agent**: Computes least-cost spatial corridor pathways with GeoJSON geometries.
  5. **Risk Assessment Agent**: Evaluates highway collision risk and village buffer encroachments.
  6. **Validation Agent**: Validates corridors against ecological minimum width and safety criteria.
  7. **Recovery Agent**: Applies eco-underpass mitigation modifiers and waypoint rerouting.
  8. **Monitoring Agent**: Synthesizes executive decision-support conservation reports.
- **Interactive GIS Map**: Leaflet GIS map with toggleable spatial layers (Forests, Telemetry Sightings, Water Holes, Highways, Villages, Habitat Quality Overlay, Conflict Hotspots, and Proposed Corridors).
- **Real-Time Pipeline Timeline**: Socket.IO live stream displaying agent state transitions, logs, memory, and control actions (Pause, Resume, Cancel, Retry).
- **Decision-Support Conservation Reports**: Synthesizes exportable reports with confidence scores, data sources, assumptions, and limitations.

---

## 🏗️ Technology Stack

### Frontend
- Next.js (Pages Router)
- React 19
- Tailwind CSS
- Zustand
- React Flow (`@xyflow/react`)
- Leaflet & React Leaflet
- Socket.IO Client
- Lucide React

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & Bcryptjs (cost factor 12)
- BullMQ & Redis (with async in-memory fallback)
- Socket.IO Real-Time Stream Engine
- Turf.js Vector GIS Spatial Processing Engine
- Google Generative AI (Gemini) / OpenRouter

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### 2. Start the Backend Server

```bash
cd server
npm start
```
*Backend server will run on `http://localhost:5000` (or `http://localhost:50001` if port 5000 is occupied).*

### 3. Start the Frontend Console

```bash
cd client
npm run dev
```
*Frontend console will run on `http://localhost:3000`.*

---

## 🛡️ License

Distributed under the MIT License.
