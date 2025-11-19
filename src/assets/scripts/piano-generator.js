// Piano Scale Generator using TonalJS (local)
class PianoScaleGenerator {
  constructor() {
    // Piano layout: 10 white keys starting from C
    this.whiteKeys = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E"];

    // Black key positions and notes
    this.blackKeys = [
      "C#",
      "D#",
      null,
      "F#",
      "G#",
      "A#",
      null,
      "C#",
      "D#",
      null,
    ];
  }

  normalizeNote(note) {
    // Handle all enharmonic equivalents for piano keys
    const noteMap = {
      // Double flats
      'Bbb': 'A',
      'Ebb': 'D',
      'Abb': 'G',
      'Dbb': 'C',
      'Gbb': 'F',
      'Cbb': 'Bb',
      'Fbb': 'Eb',

      // Regular flats
      'Cb': 'B',
      'Db': 'C#',
      'Eb': 'D#',
      'Fb': 'E',
      'Gb': 'F#',
      'Ab': 'G#',
      'Bb': 'A#',

      // Double sharps
      'B##': 'C#',
      'E##': 'F#',
      'A##': 'B',
      'D##': 'E',
      'G##': 'A',
      'C##': 'D',
      'F##': 'G'
    };

    return noteMap[note] || note;
  }

  // Generate scale using TonalJS
  generateScale(tonic, scaleName) {
    try {
      if (!window.Tonal || !window.Tonal.Scale) {
        throw new Error("TonalJS Scale module not loaded");
      }

      const scale = window.Tonal.Scale.get(`${tonic} ${scaleName}`);
      if (!scale.notes || scale.notes.length === 0) {
        throw new Error(`Scale "${tonic} ${scaleName}" not found`);
      }

      // Normalize all notes in the scale
      return scale.notes.map((note) => this.normalizeNote(note));
    } catch (error) {
      throw new Error(`Failed to generate scale: ${error.message}`);
    }
  }

  // Create the ASCII piano with scale dots
  generatePiano(tonic, scaleName) {
    const scaleNotes = this.generateScale(tonic, scaleName);
    const normalizedTonic = this.normalizeNote(tonic);

    // Create the keyboard template
    let piano = [
      " _______________________________________",
      "|  | | | |  |  | | | | | |  |  | | | |  |",
      "|  | | | |  |  | | | | | |  |  | | | |  |",
      "|  | | | |  |  | | | | | |  |  | | | |  |",
      "|  |_| |_|  |  |_| |_| |_|  |  |_| |_|  |",
      "|   |   |   |   |   |   |   |   |   |   |",
      "|   |   |   |   |   |   |   |   |   |   |",
      "|___|___|___|___|___|___|___|___|___|___|",
    ];

    // Mark black keys (row index 2)
    const blackKeyRow = piano[2].split("");
    for (let i = 0; i < this.blackKeys.length; i++) {
      if (this.blackKeys[i] && scaleNotes.includes(this.blackKeys[i])) {
        const pos = this.getBlackKeyPosition(i);
        if (pos !== -1) {
          if (this.blackKeys[i] === normalizedTonic) {
            blackKeyRow[pos] = "o";
          } else {
            blackKeyRow[pos] = "•";
          }
        }
      }
    }
    piano[2] = blackKeyRow.join("");

    // Mark white keys (row index 5)
    const whiteKeyRow = piano[6].split("");
    for (let i = 0; i < this.whiteKeys.length; i++) {
      if (scaleNotes.includes(this.whiteKeys[i])) {
        const pos = this.getWhiteKeyPosition(i);
        if (this.whiteKeys[i] === normalizedTonic) {
          whiteKeyRow[pos] = "o";
        } else {
          whiteKeyRow[pos] = "•";
        }
      }
    }
    piano[6] = whiteKeyRow.join("");

    return piano.join("\n");
  }

  // Get character position for black key markers
  getBlackKeyPosition(index) {
    const positions = [4, 8, -1, 16, 20, 24, -1, 32, 36, -1];
    return positions[index];
  }

  // Get character position for white key markers
  getWhiteKeyPosition(index) {
    const positions = [2, 6, 10, 14, 18, 22, 26, 30, 34, 38];
    return positions[index];
  }

  // Main function to generate piano with scale
  generate(tonic, scaleName) {
    try {
      const result = this.generatePiano(tonic, scaleName);
      return {
        success: true,
        piano: result,
        scale: this.generateScale(tonic, scaleName),
        title: `${tonic} ${scaleName}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
// Copy output to clipboard
function copyToClipboard() {
  const output = document.getElementById("output");
  const text = `\`\`\`\n ${output.innerText}; \n\`\`\``;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Show feedback
      const button = document.querySelector(".copy-btn");
      const originalText = button.textContent;
      button.textContent = "Copied!";
      button.style.backgroundColor = "#45a049";

      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = "";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
      alert("Failed to copy to clipboard");
    });
}
// Global function for HTML usage
function generatePianoScale(tonic, scaleName) {
  const generator = new PianoScaleGenerator();
  return generator.generate(tonic, scaleName);
}

window.onload = function () {
  generateScale();
};

function generateScale() {
  const tonic = document.getElementById("tonic").value;
  const scaleName = document.getElementById("scale").value;
  const result = generatePianoScale(tonic, scaleName);

  const output = document.getElementById("output");

  if (result.success) {
    output.innerHTML = `
        <pre class="piano">${result.title}
            <br>${result.piano}<br>
            <br>Notes: ${result.scale.join(" ")}
        </pre>
        `;
  } else {
    output.innerHTML = `<div class="error">${result.error}</div>`;
  }
}
