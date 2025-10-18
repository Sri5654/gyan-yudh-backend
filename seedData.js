const mongoose = require('mongoose');
const Quest = require('./models/Quest');
require('dotenv').config();

const seedQuests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gyan-yudh');
    
    // Clear existing quests
    await Quest.deleteMany({});
    
    const quests = [
      {
        title: "Mastering Pointers in C",
        subject: "C Programming",
        description: "Learn to work with pointers, memory allocation, and pointer arithmetic in C programming.",
        difficulty: "Medium",
        xpReward: 75,
        type: "coding",
        icon: "code",
        content: {
          problemStatement: "Write a C function that reverses an array using pointers.",
          testCases: [
            {
              input: "[1, 2, 3, 4, 5]",
              expectedOutput: "[5, 4, 3, 2, 1]"
            }
          ]
        }
      },
      {
        title: "Implementing a Binary Search Tree",
        subject: "Data Structures",
        description: "Build a complete binary search tree with insertion, deletion, and traversal operations.",
        difficulty: "Hard",
        xpReward: 100,
        type: "coding",
        icon: "tree",
        content: {
          problemStatement: "Implement a BST class with insert, delete, search, and inorder traversal methods.",
          testCases: [
            {
              input: "Insert: [5, 3, 7, 2, 4, 6, 8]",
              expectedOutput: "Inorder: [2, 3, 4, 5, 6, 7, 8]"
            }
          ]
        }
      },
      {
        title: "Cleaning the Titanic Dataset",
        subject: "Data Science",
        description: "Perform data cleaning and preprocessing on the famous Titanic dataset.",
        difficulty: "Easy",
        xpReward: 120,
        type: "coding",
        icon: "chart",
        content: {
          problemStatement: "Clean the Titanic dataset by handling missing values and encoding categorical variables.",
          testCases: [
            {
              input: "Raw Titanic CSV data",
              expectedOutput: "Cleaned dataset with no missing values"
            }
          ]
        }
      },
      {
        title: "Operating Systems Concepts Quiz",
        subject: "Operating Systems",
        description: "Test your knowledge of OS concepts including processes, threads, and memory management.",
        difficulty: "Medium",
        xpReward: 60,
        type: "quiz",
        icon: "brain",
        content: {
          questions: [
            {
              question: "What is a process in operating systems?",
              options: [
                "A program in execution",
                "A file on disk",
                "A CPU instruction",
                "A memory location"
              ],
              correctAnswer: 0
            },
            {
              question: "Which scheduling algorithm gives the shortest average waiting time?",
              options: [
                "FCFS",
                "SJF",
                "Round Robin",
                "Priority Scheduling"
              ],
              correctAnswer: 1
            }
          ]
        }
      },
      {
        title: "Database Normalization Review",
        subject: "Database Management",
        description: "Review database normalization concepts with interactive flashcards.",
        difficulty: "Easy",
        xpReward: 40,
        type: "review",
        icon: "database",
        content: {
          problemStatement: "Study the different normal forms and their applications in database design."
        }
      },
      {
        title: "Debug the Sorting Algorithm",
        subject: "Algorithms",
        description: "Find and fix bugs in a broken quicksort implementation.",
        difficulty: "Medium",
        xpReward: 80,
        type: "debug",
        icon: "bug",
        content: {
          codeToDebug: `
def quicksort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
          `
        }
      }
    ];
    
    await Quest.insertMany(quests);
    console.log('Quests seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding quests:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedQuests();