"use strict";
// Frontend TypeScript entry point for ft_transcendence
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscendenceApp = void 0;
class TranscendenceApp {
    constructor() {
        this.currentUser = null;
        this.apiBaseUrl = '/api';
        this.initializeApp();
    }
    initializeApp() {
        console.log('Initializing ft_transcendence application...');
        this.setupEventListeners();
        this.checkAuthStatus();
    }
    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        // Handle browser back/forward buttons (SPA requirement)
        window.addEventListener('popstate', (e) => this.handlePopState(e));
    }
    async handleLogin(event) {
        event.preventDefault();
        const form = event.target;
        const aliasInput = form.querySelector('#loginAlias');
        const alias = aliasInput.value.trim();
        if (!alias) {
            this.showError('Please enter an alias');
            return;
        }
        try {
            // For now, simulate login - will be replaced with actual API call
            console.log('Login attempt:', alias);
            await this.simulateApiCall();
            this.currentUser = { alias };
            this.showGameSection();
            this.updateUrl('/game');
        }
        catch (error) {
            this.showError('Login failed. Please try again.');
            console.error('Login error:', error);
        }
    }
    async handleRegister(event) {
        event.preventDefault();
        const form = event.target;
        const aliasInput = form.querySelector('#registerAlias');
        const alias = aliasInput.value.trim();
        if (!alias) {
            this.showError('Please enter an alias');
            return;
        }
        try {
            // For now, simulate registration - will be replaced with actual API call
            console.log('Registration attempt:', alias);
            await this.simulateApiCall();
            this.currentUser = { alias };
            this.showGameSection();
            this.updateUrl('/game');
        }
        catch (error) {
            this.showError('Registration failed. Please try again.');
            console.error('Registration error:', error);
        }
    }
    async simulateApiCall() {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(resolve, 500);
        });
    }
    showGameSection() {
        const authSection = document.querySelector('.auth-section');
        const gameSection = document.querySelector('.game-section');
        if (authSection)
            authSection.style.display = 'none';
        if (gameSection) {
            gameSection.style.display = 'block';
            this.updateGameArea();
        }
    }
    showAuthSection() {
        const authSection = document.querySelector('.auth-section');
        const gameSection = document.querySelector('.game-section');
        if (authSection)
            authSection.style.display = 'block';
        if (gameSection)
            gameSection.style.display = 'none';
    }
    updateGameArea() {
        const gameArea = document.getElementById('gameArea');
        if (gameArea && this.currentUser) {
            gameArea.innerHTML = `
                <h3>Welcome, ${this.currentUser.alias}!</h3>
                <p>Tournament system will be implemented here</p>
                <button onclick="app.logout()">Logout</button>
            `;
        }
    }
    checkAuthStatus() {
        // Check if user should be in game mode based on URL
        const path = window.location.pathname;
        if (path === '/game' && this.currentUser) {
            this.showGameSection();
        }
        else {
            this.showAuthSection();
        }
    }
    handlePopState(event) {
        // Handle browser back/forward buttons
        const path = window.location.pathname;
        if (path === '/game' && this.currentUser) {
            this.showGameSection();
        }
        else {
            this.showAuthSection();
            this.updateUrl('/');
        }
    }
    updateUrl(path) {
        // Update URL without page reload (SPA requirement)
        window.history.pushState({}, '', path);
    }
    showError(message) {
        // Simple error display - could be enhanced with better UI
        alert(message);
    }
    logout() {
        this.currentUser = null;
        this.showAuthSection();
        this.updateUrl('/');
    }
}
exports.TranscendenceApp = TranscendenceApp;
// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TranscendenceApp();
});
