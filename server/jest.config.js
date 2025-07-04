/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',            
  testEnvironment: 'node',       
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',   
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], 
  clearMocks: true,            
};