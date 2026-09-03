// LifeSkill OS — Intent & Experience Engine

const LifeSkillIntent = {
    categories: {
        physics: [
            "physics", "motion", "force", "friction",
            "speed", "acceleration", "gravity"
        ],

        biology: [
            "biology", "cell", "tissue", "organ",
            "plant", "human body", "photosynthesis"
        ],

        mathematics: [
            "math", "mathematics", "algebra", "geometry",
            "triangle", "coordinate", "polynomial", "number"
        ],

        communication: [
            "communication", "speaking", "conversation",
            "interview", "presentation", "confidence"
        ],

        coding: [
            "coding", "programming", "python", "javascript",
            "html", "computer", "software"
        ],

        lifeSkills: [
            "decision", "problem solving", "emergency",
            "money", "shopping", "safety", "negotiation",
            "leadership", "teamwork"
        ]
    },

    detect(goal) {
        if (!goal || typeof goal !== "string") {
            return {
                category: "lifeSkills",
                confidence: 0
            };
        }

        const text = goal.toLowerCase().trim();

        let bestCategory = "lifeSkills";
        let bestScore = 0;

        for (const [category, keywords] of Object.entries(this.categories)) {
            let score = 0;

            for (const keyword of keywords) {
                if (text.includes(keyword)) {
                    score++;
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestCategory = category;
            }
        }

        return {
            category: bestCategory,
            confidence: Math.min(bestScore / 3, 1),
            goal: text
        };
    },

    createExperience(goal) {
        const intent = this.detect(goal);

        return {
            goal: goal,
            category: intent.category,
            confidence: intent.confidence,

            experience: {
                immersive: true,
                interactive: true,
                realistic: true,

                environment: this.getEnvironment(intent.category),
                objective: this.getObjective(goal, intent.category),

                difficulty: "adaptive",

                evaluation: {
                    decisionMaking: true,
                    accuracy: true,
                    reaction: true,
                    completion: true
                }
            }
        };
    },

    getEnvironment(category) {
        const environments = {
            physics: "realistic physics laboratory",
            biology: "interactive biology laboratory",
            mathematics: "immersive mathematics environment",
            communication: "realistic social environment",
            coding: "interactive technology laboratory",
            lifeSkills: "realistic real-world environment"
        };

        return environments[category] || environments.lifeSkills;
    },

    getObjective(goal, category) {
        if (goal && goal.trim()) {
            return `Complete the experience: ${goal}`;
        }

        return `Complete the ${category} experience`;
    }
};


// Global helper used by LifeSkill OS
function understandIntent(goal) {
    return LifeSkillIntent.createExperience(goal);
}


// Optional helper for debugging
function getIntentCategory(goal) {
    return LifeSkillIntent.detect(goal).category;
}


// Make available globally in the browser
window.LifeSkillIntent = LifeSkillIntent;
window.understandIntent = understandIntent;
window.getIntentCategory = getIntentCategory;
