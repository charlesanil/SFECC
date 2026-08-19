/* =========================================
   SFECC NGT CASE REGISTER
   ========================================= */

async function loadNGTCases() {

    const casesContainer = document.getElementById("cases-container");

    // Only run on the Our Cases page
    if (!casesContainer) {
        return;
    }

    try {

        const response = await fetch("data/ngt-cases.json");

        if (!response.ok) {
            throw new Error("Unable to load case data.");
        }

        const cases = await response.json();

        casesContainer.innerHTML = "";

        cases.forEach((item, index) => {

            const caseCard = document.createElement("article");

            caseCard.className = "case-card";

            caseCard.innerHTML = `
                <div class="case-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="case-content">

                    <p class="case-label">
                        ${item.caseNo || "Case Number not available"}
                    </p>

                    <h3>
                        ${item.caseTitle || "Case title not available"}
                    </h3>

                    <div class="case-meta">

                        <span>
                            <strong>Forum</strong>
                            ${item.bench || "—"}
                        </span>

                        <span>
                            <strong>District</strong>
                            ${item.district || "—"}
                        </span>

                        <span>
                            <strong>Registered</strong>
                            ${formatCaseDate(item.registrationDate)}
                        </span>

                        <span>
                            <strong>Status</strong>
                            ${item.status || "—"}
                        </span>

                    </div>

                </div>
            `;

            casesContainer.appendChild(caseCard);

        });

    } catch (error) {

        console.error("Error loading NGT cases:", error);

        casesContainer.innerHTML = `
            <div class="cases-error">
                <p>
                    Case information is currently unavailable.
                    Please check back later.
                </p>
            </div>
        `;
    }
}


/* Format YYYY-MM-DD into a readable date */

function formatCaseDate(dateString) {

    if (!dateString) {
        return "—";
    }

    const date = new Date(dateString);

    if (isNaN(date)) {
        return dateString;
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


/* Load cases when page is ready */

document.addEventListener("DOMContentLoaded", loadNGTCases);