// ------------------------------
// GitHub Profile Viewer
// ------------------------------

// Select HTML elements
const githubForm =
    document.getElementById("github-form");

const usernameInput =
    document.getElementById("username");

const githubStatus =
    document.getElementById("github-status");

const profileContainer =
    document.getElementById("profile-container");


// ------------------------------
// Fetch GitHub profile
// ------------------------------

const fetchGitHubProfile = async (username) => {

    const userURL =
        `https://api.github.com/users/${username}`;

    const reposURL =
        `https://api.github.com/users/${username}/repos?per_page=100`;

    try {

        // Show loading state
        githubStatus.textContent =
            "Loading GitHub profile...";

        // Clear previous profile
        profileContainer.innerHTML = "";

        // Fetch user information
        const userResponse =
            await fetch(userURL);

        // Handle user not found
        if (userResponse.status === 404) {

            throw new Error(
                "USER_NOT_FOUND"
            );
        }

        if (!userResponse.ok) {

            throw new Error(
                "Unable to fetch GitHub profile."
            );
        }

        // Convert JSON to JavaScript object
        const user =
            await userResponse.json();


        // Fetch repositories
        const repoResponse =
            await fetch(reposURL);

        if (!repoResponse.ok) {

            throw new Error(
                "Unable to fetch repositories."
            );
        }

        const repositories =
            await repoResponse.json();


        // GitHub does not directly sort this endpoint
        // by star count, so we sort the repositories
        // ourselves.

        const topRepositories =
            repositories
                .sort(
                    (a, b) =>
                        b.stargazers_count -
                        a.stargazers_count
                )
                .slice(0, 5);


        // Remove loading message
        githubStatus.textContent = "";

        // Display profile
        displayProfile(
            user,
            topRepositories
        );

    } catch (error) {

        profileContainer.innerHTML = "";

        if (error.message === "USER_NOT_FOUND") {

            githubStatus.textContent =
                "GitHub user not found. Please check the username.";

        } else {

            githubStatus.textContent =
                "Something went wrong. Please try again.";

        }

        console.error(error);
    }
};


// ------------------------------
// Display profile
// ------------------------------

const displayProfile =
    (user, repositories) => {

        // Create main profile card
        const profileCard =
            document.createElement("div");

        profileCard.classList.add(
            "profile-card"
        );


        // Create avatar
        const avatar =
            document.createElement("img");

        avatar.src = user.avatar_url;

        avatar.alt =
            `${user.login}'s GitHub avatar`;

        avatar.classList.add(
            "avatar"
        );


        // Create name
        const name =
            document.createElement("h2");

        name.textContent =
            user.name || user.login;


        // Create username
        const username =
            document.createElement("p");

        username.textContent =
            `@${user.login}`;

        username.classList.add(
            "username"
        );


        // Create bio
        const bio =
            document.createElement("p");

        bio.textContent =
            user.bio || "No bio available.";


        // --------------------------
        // Profile statistics
        // --------------------------

        const stats =
            document.createElement("div");

        stats.classList.add("stats");


        const followers =
            document.createElement("p");

        followers.textContent =
            `Followers: ${user.followers}`;


        const following =
            document.createElement("p");

        following.textContent =
            `Following: ${user.following}`;


        const repoCount =
            document.createElement("p");

        repoCount.textContent =
            `Public Repos: ${user.public_repos}`;


        stats.append(
            followers,
            following,
            repoCount
        );


        // Add profile information
        profileCard.append(
            avatar,
            name,
            username,
            bio,
            stats
        );


        // Add profile to page
        profileContainer.appendChild(
            profileCard
        );


        // --------------------------
        // Repository section
        // --------------------------

        const repoHeading =
            document.createElement("h2");

        repoHeading.textContent =
            "Top 5 Repositories";

        profileContainer.appendChild(
            repoHeading
        );


        const repoList =
            document.createElement("div");

        repoList.classList.add(
            "repo-list"
        );


        // Create each repository dynamically
        repositories.forEach(
            (repo) => {

                const repoCard =
                    document.createElement("article");

                repoCard.classList.add(
                    "repo-card"
                );


                // Repository name
                const repoName =
                    document.createElement("a");

                repoName.textContent =
                    repo.name;

                repoName.href =
                    repo.html_url;

                repoName.target =
                    "_blank";

                repoName.rel =
                    "noopener noreferrer";


                // Description
                const description =
                    document.createElement("p");

                description.textContent =
                    repo.description ||
                    "No description available.";


                // Star count
                const stars =
                    document.createElement("p");

                stars.textContent =
                    `⭐ ${repo.stargazers_count} stars`;


                // Primary language
                const language =
                    document.createElement("p");

                language.textContent =
                    `Language: ${repo.language || "Not specified"}`;


                repoCard.append(
                    repoName,
                    description,
                    stars,
                    language
                );


                repoList.appendChild(
                    repoCard
                );
            }
        );


        profileContainer.appendChild(
            repoList
        );
    };


// ------------------------------
// Search form
// ------------------------------

githubForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        // Remove spaces from input
        const username =
            usernameInput.value.trim();

        if (!username) {

            githubStatus.textContent =
                "Please enter a GitHub username.";

            return;
        }

        fetchGitHubProfile(username);
    }
);