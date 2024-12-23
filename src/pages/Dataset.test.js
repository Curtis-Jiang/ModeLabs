import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dataset from './Dataset';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
    addDoc: jest.fn(),
    deleteDoc: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
}));

// Mock AuthContext
const mockUser = { uid: '123', email: 'test@example.com' };
const mockAuthContextValue = { user: mockUser };

describe('Dataset Component', () => {
    beforeEach(() => {
        // Mock Firestore data
        getDocs.mockResolvedValue({
            docs: [
                {
                    id: '1',
                    data: () => ({
                        name: 'Dataset 1',
                        userId: '123',
                        userEmail: 'test@example.com',
                        fileSize: 1024,
                        fileType: '.json',
                        uploadedAt: { toDate: () => new Date() },
                        description: 'Test dataset 1',
                        status: 'pending',
                        downloads: 0,
                        visibility: 'public',
                        category: 'Large Language Models',
                        subCategory: 'Language Understanding',
                        tags: [],
                    }),
                },
            ],
        });
    });

    test('renders the component', async () => {
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <Dataset />
            </AuthContext.Provider>
        );

        expect(screen.getByText(/Model Evaluation Datasets/i)).toBeInTheDocument();
        expect(screen.getByText(/Upload New Dataset/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Dataset 1/i)).toBeInTheDocument();
        });
    });

    test('allows file selection', () => {
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <Dataset />
            </AuthContext.Provider>
        );

        const fileInput = screen.getByLabelText(/Select File/i);
        const file = new File(['dummy content'], 'example.json', { type: 'application/json' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(screen.getByText(/example.json/i)).toBeInTheDocument();
    });

    test('handles file upload', async () => {
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <Dataset />
            </AuthContext.Provider>
        );

        const fileInput = screen.getByLabelText(/Select File/i);
        const file = new File(['dummy content'], 'example.json', { type: 'application/json' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        const uploadButton = screen.getByText(/Upload/i);
        fireEvent.click(uploadButton);

        await waitFor(() => {
            expect(screen.getByText(/Dataset metadata saved successfully!/i)).toBeInTheDocument();
        });
    });

    test('filters datasets based on search query', async () => {
        render(
            <AuthContext.Provider value={mockAuthContextValue}>
                <Dataset />
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Dataset 1/i)).toBeInTheDocument();
        });

        const searchInput = screen.getByPlaceholderText(/Search datasets.../i);
        fireEvent.change(searchInput, { target: { value: 'non-existent' } });

        expect(screen.queryByText(/Dataset 1/i)).not.toBeInTheDocument();
    });
});