import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const doc = new PDFDocument({ margin: 50 });
const destPath = path.join("public", "resume.pdf");

// Ensure public dir exists
if (!fs.existsSync("public")) {
  fs.mkdirSync("public");
}

const writeStream = fs.createWriteStream(destPath);
doc.pipe(writeStream);

// Font settings (using Helvetica standard fonts)
const fontBold = "Helvetica-Bold";
const fontRegular = "Helvetica";
const fontOblique = "Helvetica-Oblique";

// Title
doc.font(fontBold).fontSize(22).fillColor("#0f172a").text("SRINATH KONDA VENKATA", { align: "center" });

// Contact Info
doc.font(fontRegular).fontSize(9.5).fillColor("#475569");
doc.text("kondavenkatasrinath64312@gmail.com | +91 XXXXXXXXXX | Hyderabad, India", { align: "center" });
doc.text("github.com/Srinath64312 | linkedin.com/in/srinath-konda-venkata-096ab940a", { align: "center" });

doc.moveDown(1.5);

// Divider helper
function drawDivider() {
  doc.strokeColor("#cbd5e1").lineWidth(1).moveTo(50, doc.y).lineTo(562, doc.y).stroke();
  doc.moveDown(0.8);
}

// Section Header helper
function addSectionHeader(title) {
  doc.font(fontBold).fontSize(13).fillColor("#6366f1").text(title.toUpperCase());
  doc.moveDown(0.2);
  drawDivider();
}

// EDUCATION SECTION
addSectionHeader("Education");
doc.font(fontBold).fontSize(11).fillColor("#0f172a").text("KLH Aziznagar", { continued: true });
doc.font(fontRegular).fontSize(10).fillColor("#475569").text(" — Hyderabad, India", { continued: false });
doc.font(fontOblique).fontSize(10).text("Bachelor of Technology in Computer Science and Engineering", { continued: true });
doc.font(fontRegular).text(" | CGPA: Current", { align: "right" });
doc.font(fontRegular).fontSize(9.5).text("Expected Graduation: 2029", { continued: true });
doc.font(fontRegular).text("Duration: 2025 — 2029", { align: "right" });

doc.font(fontRegular).fontSize(9.5).fillColor("#475569").text("• Relevant Coursework: Data Structures, Machine Learning, Database Management Systems, Object-Oriented Programming.");
doc.moveDown(1.5);

// SKILLS SECTION
addSectionHeader("Technical Skills");
doc.font(fontBold).fontSize(10).fillColor("#0f172a").text("Programming Languages: ", { continued: true });
doc.font(fontRegular).fillColor("#475569").text("Python, Java, JavaScript, HTML5, CSS3");

doc.font(fontBold).text("Web Development & Frameworks: ", { continued: true });
doc.font(fontRegular).fillColor("#475569").text("React, Vite, Node.js");

doc.font(fontBold).text("Databases: ", { continued: true });
doc.font(fontRegular).fillColor("#475569").text("SQL, PostgreSQL");

doc.font(fontBold).text("Tools & Platforms: ", { continued: true });
doc.font(fontRegular).fillColor("#475569").text("Git, GitHub, VS Code");

doc.font(fontBold).text("Areas of Interest: ", { continued: true });
doc.font(fontRegular).fillColor("#475569").text("Machine Learning, Full-Stack Web Development, Intelligent Systems");

doc.moveDown(1.5);

// PROJECTS SECTION
addSectionHeader("Projects");

// Project 1
doc.font(fontBold).fontSize(11).fillColor("#0f172a").text("Hybrid Intelligent Planning System", { continued: true });
doc.font(fontRegular).fontSize(9.5).fillColor("#475569").text(" | JavaScript, AI Algorithms", { align: "right" });
doc.font(fontRegular).fontSize(9.5).text("• Smart Campus AI Planner leveraging Search, CSP, and Bayesian Inference algorithms to optimize schedules and resources.");
doc.font(fontRegular).text("• Implemented adaptive schedule modeling to respond to real-time resource shifts.");
doc.moveDown(0.6);

// Project 2
doc.font(fontBold).fontSize(11).fillColor("#0f172a").text("Banking Application", { continued: true });
doc.font(fontRegular).fontSize(9.5).fillColor("#475569").text(" | React, JavaScript, CSS3", { align: "right" });
doc.font(fontRegular).fontSize(9.5).text("• Designed a modern, glassmorphic dashboard interface focusing on premium UI/UX, smooth filters, and micro-interactions.");
doc.font(fontRegular).text("• Simulated transaction pipelines and linked account overview widgets securely.");
doc.moveDown(0.6);

// Project 3
doc.font(fontBold).fontSize(11).fillColor("#0f172a").text("College Management System", { continued: true });
doc.font(fontRegular).fontSize(9.5).fillColor("#475569").text(" | Java, SQL Database", { align: "right" });
doc.font(fontRegular).fontSize(9.5).text("• Developed a complete database management system to manage courses, students, and grading records cleanly.");
doc.font(fontRegular).text("• Integrated transactional queries to maintain data integrity across schedules.");

doc.moveDown(1.5);

// CERTIFICATIONS
addSectionHeader("Certifications");

doc.font(fontBold).fontSize(10).fillColor("#0f172a").text("freeCodeCamp: ", { continued: true });
doc.font(fontRegular).fontSize(9.5).fillColor("#475569").text("Legacy Responsive Web Design V8 (Issued March 2026, Credential ID: srinath64312-rwd)");

doc.font(fontBold).fontSize(10).fillColor("#0f172a").text("Simplilearn SkillUp: ", { continued: true });
doc.font(fontRegular).fontSize(9.5).fillColor("#475569").text("ReactJS for Beginners (Issued 31st May 2026, Certificate ID: 10291368)");

doc.end();

writeStream.on("finish", () => {
  console.log("Resume generated successfully at public/resume.pdf");
});
