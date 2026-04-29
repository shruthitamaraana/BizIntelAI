/**
 * BizIntel AI - Core Frontend Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. STATE MANAGEMENT
    const state = {
        currentStep: 1,
        formData: {
            domain: '',
            skills: [],
            budget: 5000,
            location: { lat: null, lng: null, radius: 1000 }
        }
    };

    // 2. MULTI-STEP FORM NAVIGATION
    const steps = document.querySelectorAll('.step-content');
    const updateSteps = () => {
        steps.forEach((step, idx) => {
            step.classList.toggle('active', (idx + 1) === state.currentStep);
        });
        
        // Initialize Map only when reaching the location step (Step 4)
        if (state.currentStep === 4) {
            initLeafletMap();
        }
    };

    window.nextStep = () => {
        if (state.currentStep < steps.length) {
            state.currentStep++;
            updateSteps();
        }
    };

    window.prevStep = () => {
        if (state.currentStep > 1) {
            state.currentStep--;
            updateSteps();
        }
    };

    // 3. SKILLS TAG SYSTEM
    const skillInput = document.querySelector('#skill-input');
    const tagsWrapper = document.querySelector('#tags-wrapper');

    if (skillInput) {
        skillInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && skillInput.value.trim() !== '') {
                const skill = skillInput.value.trim();
                if (!state.formData.skills.includes(skill)) {
                    state.formData.skills.push(skill);
                    renderTags();
                }
                skillInput.value = '';
            }
        });
    }

    const renderTags = () => {
        tagsWrapper.innerHTML = state.formData.skills.map((s, i) => `
            <div class="tag">
                ${s} <span class="tag-remove" onclick="removeSkill(${i})">&times;</span>
            </div>
        `).join('');
    };

    window.removeSkill = (index) => {
        state.formData.skills.splice(index, 1);
        renderTags();
    };

    // 4. MAP LOGIC (LEAFLET)
    let map, marker, circle;

    const initLeafletMap = () => {
        if (map) return; // Prevent multiple initializations

        // Default to center of India or User's Current Location
        map = L.map('map').setView([20.5937, 78.9629], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        map.on('click', (e) => {
            const { lat, lng } = e.latlng;
            state.formData.location.lat = lat;
            state.formData.location.lng = lng;

            updateMapMarker(lat, lng);
            fetchLocationDetails(lat, lng);
        });
    };

    const updateMapMarker = (lat, lng) => {
        if (marker) map.removeLayer(marker);
        if (circle) map.removeLayer(circle);

        marker = L.marker([lat, lng]).addTo(map);
        
        const radius = document.querySelector('#radius-slider')?.value || 1000;
        circle = L.circle([lat, lng], {
            radius: parseInt(radius),
            color: '#2563eb',
            fillColor: '#3b82f6',
            fillOpacity: 0.2
        }).addTo(map);

        map.setView([lat, lng], 14);
    };

    // 5. DATA SUBMISSION (To Flask Backend)
    window.submitAnalysis = async () => {
        const loadingScreen = document.querySelector('#loading-overlay');
        if (loadingScreen) loadingScreen.style.display = 'flex';

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state.formData)
            });

            const result = await response.json();
            // Redirect to results page with data
            sessionStorage.setItem('lastResult', JSON.stringify(result));
            window.location.href = '/results';
        } catch (error) {
            console.error("Analysis Failed:", error);
            alert("Something went wrong. Please check your connection.");
        }
    };
    window.nextStep = function() {
    if (state.currentStep === 1) {
        // Check if a domain is selected
        const selectedDomain = document.querySelector('input[name="domain"]:checked');
        if (!selectedDomain) {
            alert("Please select a business domain first!");
            return;
        }
    }
    
    // Proceed with navigation...
    document.querySelector(`.step-content[data-step="${state.currentStep}"]`).classList.remove('active');
    state.currentStep++;
    document.querySelector(`.step-content[data-step="${state.currentStep}"]`).classList.add('active');
    
    // Update the UI (Map, labels, etc.)
    if (typeof updateStepUI === 'function') updateStepUI();
};
});