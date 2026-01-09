export interface ProjectData {
    id: string;
    title: string;
    tech: string;
    desc: string;
    emoji: string;
    emojiClass: string;
    overview: string;
    features: string[];
    challenges: { problem: string; solution: string }[];
    results: string[];
    links?: { label: string; url: string }[];
}

export const projectsData: ProjectData[] = [
    {
        id: "ai-trade-bot",
        title: "AI Trade Bot",
        tech: "Python, TensorFlow, PyTorch",
        desc: "Reinforcement learning algorithm (A2C) built for a real world trading application",
        emoji: "🧠🤖",
        emojiClass: "project-emoji-purple",
        overview: "Built an A2C algorithm which trades using LSTM-based actor–critic networks, " +
          "which are parallelized across multiple worker agents and a centralized learner agent. The system consists of a custom trading " +
          "environment to match the real world market, a memory-efficient data pipeline for multi-year historical data training, " +
          "and a modular indicator system which supports multiple different trading methodologies.",
        features: [
            "Distributed A2C architecture consisting of multiple worker agents which share experiences to a centralized learner agent",
            "Designed a realistic trading environment including but not limited to commissions, order management and liquidation orders etc...",
            "Developed a modular technical indicator system to test different trading strategies",
            "Built a memory first data pipeline with Parquet, sliding windows and memory-mapped files to process trading data",
            "Model is built as a dual-layer LSTM-based neural network which allows for learning of the sequence",
        ],
        challenges: [
            {
                problem: "The synchronization of 4 parallel worker agents and preventing race conditions when accessing shared memory",
                solution: "Ensured that worker agents asynchronously reload updated weights according to synchronization timestamps. The learner agents also ensures to wait for all agents to finish before performing a batch update.",
            },
            {
                problem: "Training data spans from 2011-2020 on 1 minute intervals, requiring an efficient storage and retrieval",
                solution: "By using Parquet files for compression as well as a 30 candlestick sliding window. Pre-computed indicators are stored in memory-mapped files for on demand access."
            },
            {
                problem: "Designing the reward function for optimal realized and unrealized profits while still maintaining a swing trading focus",
                solution: "Utilized a hybrid reward function (30% unrealized profit and 70% realized profit) to encourage position closure and managing variance. A commission cost is placed in to discourage over-trading and "
            }
        ],
        results: [
            "Achieved ~1.35 Sharpe ratio training, outperforming a buy-and-hold baseline by ~18% return (2011–2020)",
            "Improved training stability, reduced reward variance by 40% after introducing the hybrid reward function as well as an A2C advantage normalization",
            "Successfully scaled training of 4.7M observations while maintaining <2GB RAM usage, enabling multi-year back-testing on any hardware",
        ]
    },
    {
        id: "ai-cad",
        title: "AI CAD Tool",
        tech: "Typescript, Tensorflow, OpenCASCADE",
        desc: "A modern Electron-based CAD app combining React, Three.js, and OpenCASCADE to create sketches and diagrams with real-time rendering. (In progress...)",
        emoji: "🦾🤖",
        emojiClass: "project-emoji-green",
        overview: "Browser based 2D/3D CAD application built with React, Three.js, and OpenCASCADE (OCCT), presented by " +
          "Electron. Using Electron makes it easy to leverage the React ecosystem while integrating high-performance " +
          "geometric modeling through C++ native addons.",
        features: [
            "Utilizes OCCT geometric kernel through a Node.js addon, which enables precise parametric geometry and TypeScript–C++ communication.",
            "Supports a constraint system which is designed to maintain relationships such as parallelism and perpendicularity as sketches are edited.",
            "Utilizes React Three.js for real-time rendering, object selection, and interactive camera controls within a 3D sketching environment.",
            "Runs as a secure, cross-platform Electron app with IPC-based communication and native C++ module support.",
            "Provides tools for drawing lines, circles, arcs, curves, and polygons with real-time visual feedback and responsive tool selection, all essential as a CAD software.",
        ],
        challenges: [
            {
                problem: "While OpenCASCADE is written in C++, but the application is built with TypeScript, so it makes efficient communication of complex geometric data between the two environments challenging.",
                solution: "A C++ API wrapper is written to bridged OpenCASCADE and TypeScript, exposing OCCT functionality while converting geometric data into Three.js–compatible buffers. Native manager classes maintain geometry state and enable efficient, high-performance data transfer."
            },
            {
                problem: "OpenCASCADE’s internal topology of hashmap indexing caused collisions when multiple identical edges were created rapidly, this led to existing edges being overwritten and geometry disappearing during sketching.",
                solution: "A custom UUID-based id layer was added on top of OCCT to separate application-level IDs from internal topology IDs. The C++ wrapper track edges using UUIDs, apply hash-based deduplication internally, normalize orientation, and use reference counting to safely manage identical or shared geometry without overwriting existing entities."
            },
            {
                problem: "Geometric constraints form non-linear systems need to be solved in real time. Traditional solvers were too slow for interactive CAD, which made it difficult to maintain constraint consistency within a tight timeframe.",
                solution: "A custom constraint solver was implement using gradient descent, operating on a graph of geometric entities. Analytical Jacobians, adaptive step sizing, constraint weighting, and selective subgraph updates enable fast convergence and stable real-time constraint solving within interactive performance limits."
            }
        ],
        results: [
            "Still in Progress...",
            "Built an interactive 2D sketching system with real-time previews",
            "Developed modular context-based state management for tools",
            "Established architecture for geometric constraints",
        ]
    },
    {
        id: "sous-vide",
        title: "Sous-Vide",
        tech: "Arduino, C++, Microcontrollers",
        desc: "Implemented closed loop control system for temperature regulation and easy to use UI",
        emoji: "🖥️",
        emojiClass: "project-emoji-orange",
        overview: "Embedded system designed in Altium using an ATtiny85 microcontroller, housed in a 3D-printed enclosure designed in Fusion360, programmed using low-level port manipulation in C to directly control hardware components.",
        features: [
            "Custom 3D-printed enclosure designed for durability",
            "Low power microcontroller-based design using ATtiny85",
            "Portable and standalone operation after Arduino prototyping",
            "Bang bang system for simpler system",
        ],
        challenges: [
            {
                problem: "Oscillation around set point in a bang-bang control system",
                solution: "Applied a deadband which smoothened temperature swings and solve the steady-state conduction formula"
            },
            {
                problem: "Heating element would exceed 3D print temperature and would cause it to melt",
                solution: "Took inspiration from hot water boilers and isolated the heating element away from the enclosure and designed a heat shield around it."
            },
            {
                problem: "Limited flash and memory on ATtiny85",
                solution: "Optimized firmware by using low-level port manipulation, reduces the use of overhead libraries saving on space and indirectly on speed."
            }
        ],
        results: [
            "Successfully mapped out a custom IC design meeting all specifications",
            "Achieved 40% reduction in power consumption compared to initial design",
            "Met all timing constraints with 15% margin at target frequency",
            "Design passed all DRC and LVS checks on first iteration"
        ]
    },
    {
        id: "fpga-project",
        title: "FPGA Project",
        tech: "VHDL / Digital Logic Design, FPGA Development & Debugging",
        desc: "Implemented basic digital arithmetic circuits in VHDL and deployed them on a Cyclone V FPGA.",
        emoji: "🔋",
        emojiClass: "project-emoji-green",
        overview: "This project involved designing a 1-bit full adder and an 8-bit binary-to-decimal converter using VHDL. Inputs were provided through onboard switches, and results were displayed on a 7-segment display.",
        features: [
            "1-bit full adder implemented in VHDL",
            "8-bit binary-to-decimal conversion",
            "Switch-based hardware input",
            "7-segment display output",
            "Deployed on Cyclone V FPGA",
        ],
        challenges: [
            {
                problem: "Converting binary values to a decimal format that could be easily read on hardware with limited display capabilities necessitated efficient encoding techniques and the correct assignment of FPGA pins.",
                solution: "Custom VHDL modules were developed for binary-to-decimal conversion and 7-segment encoding. These modules were then simulated and tested to verify their correct hardware behavior."
            }
        ],
        results: [
            "Successfully deployed and tested on Cyclone V FPGA",
            "Verified correct arithmetic and display output",
            "Gained practical experience with VHDL and FPGA workflows",
        ]
    },
    {
        id: "fullstack-webapp",
        title: "Fantasy Swimming",
        tech: "React, Node.js, MongoDB",
        desc: "Fantasy Swimming is a MERN-stack web app where users can play in fantasy modes such as draft swimmers and compete in leagues.",
        emoji: "🌐",
        emojiClass: "project-emoji-blue",
        overview: "Fantasy Swimming website is intended to introduce a fantasy sports element to competitive swimming. This full-stack web application uses the MERN stack, MongoDB, Express.js, React and Node.js. The platform has secure user authentication and real-time swimmer drafts facilitated by WebSockets. League management, drafting processes, and scoring are managed through a combination of REST APIs and live updates.",
        features: [
            "User Authentication & Authorization",
            "League Management System",
            "Real-Time Draft System",
            "Swimmer Database & Categorization",
            "Responsive Frontend Interface",
            "Scalable Backend Architecture"
        ],
        challenges: [
            {
                problem: "Coordinating multiple users drafting swimmers simultaneously requires real-time updates to prevent conflicts and ensure everyone saw the latest picks.",
                solution: "Implemented WebSocket connections for instant client updates, combined with database-level tracking of drafted swimmers to maintain a single source of truth and prevent duplicate selections using the features of database locks."
            },
            {
                problem: "Ensuring users picked in the correct order without conflicts or skipped turns in live drafting sessions was difficult.",
                solution: "Implemented server-side turn tracking with message queuing and polling logic to notify clients when it was their turn, ensuring orderly and reliable draft progression."
            }
        ],
        results: [
            "Backend Mongoose models and React hooks handle complex entity relationships",
            "Multi-user synchronization and turn-based drafting fully implemented"
        ]
    },
];

export const getProjectById = (id: string): ProjectData | undefined => {
    return projectsData.find(project => project.id === id);
};
