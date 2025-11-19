---
title: "Piano scales"
date: 2025-11-06
---

Musical scales are ordered sets of pitches arranged by frequency, forming the backbone of melody and harmony. Most scales span an octave—the interval between one note and its next higher (or lower) version—and follow a specific pattern of steps.

Key ideas:
- Intervals: Steps between notes are whole steps (tones) and half steps (semitones).
- Major scale: A bright-sounding seven-note pattern: W–W–H–W–W–W–H (e.g., C–D–E–F–G–A–B–C).
- Natural minor scale: A darker seven-note pattern: W–H–W–W–H–W–W (e.g., A–B–C–D–E–F–G–A).
- Other minors: Harmonic minor (raised 7th) and melodic minor (raised 6th and 7th ascending) add color and function.
- Modes: Variations derived from the major scale (e.g., Dorian, Mixolydian) each with a distinct flavor.
- Pentatonic scales: Five-note scales common worldwide; easy to use and widely melodic.
- Chromatic scale: All twelve semitones; useful for modulation and color.

<div class="piano-container">
    <div class="piano-controls">
        <div>
        <label for="tonic">Key:</label>
        <select id="tonic" onchange="generateScale()">
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="Db">Db</option>
            <option value="D">D</option>
            <option value="D#">D#</option>
            <option value="Eb">Eb</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="F#">F#</option>
            <option value="Gb">Gb</option>
            <option value="G">G</option>
            <option value="G#">G#</option>
            <option value="Ab">Ab</option>
            <option value="A">A</option>
            <option value="A#">A#</option>
            <option value="Bb">Bb</option>
            <option value="B">B</option>
        </select>
        </div>
        <div>
        <label for="scale">Scale:</label>
        <select id="scale" onchange="generateScale()">
            <option value="major">Major</option>
            <option value="minor">Natural Minor</option>
            <option value="harmonic minor">Harmonic Minor</option>
            <option value="melodic minor">Melodic Minor</option>
            <option value="dorian">Dorian</option>
            <option value="phrygian">Phrygian</option>
            <option value="lydian">Lydian</option>
            <option value="mixolydian">Mixolydian</option>
            <option value="locrian">Locrian</option>
            <option value="pentatonic">Major Pentatonic</option>
            <option value="minor pentatonic">Minor Pentatonic</option>
            <option value="blues">Blues</option>
            <option value="whole tone">Whole Tone</option>
            <option value="diminished">Diminished</option>
            <option value="augmented">Augmented</option>
            <option value="chromatic">Chromatic</option>
        </select>
        </div>
    </div>
    <div class="piano-output" id="output">
        This is where the output will be displayed.
    </div>
    <div class="output-controls">
        <button class="copy-btn" onclick="copyToClipboard()">
            Copy to Clipboard
        </button>
    </div>
</div>

Scales help:
- Build melodies and improvise
- Define key and mood
- Structure chords (harmony comes from stacking scale tones)

Practicing scales improves technique, ear training, and understanding of how music fits together.

<script defer src="/assets/scripts/tonal.min.js"></script>
<script defer src="/assets/scripts/piano-generator.js"></script>
<style>
.piano-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    border: 1px solid rgba(255,255,255,.1);
    padding: 2em;
    margin: 4em 0;
}

.piano-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-end;
}

.piano-controls > div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

select {
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255,255,255,.5);
  color: inherit;
  font-family: inherit;
  font-size: 1rem;
  padding-right: 8px;
  background-color: transparent;
  appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.25rem;
    padding-right: 2.25rem;
}

select:hover {
  border-color: rgba(255,255,255,.6);
}

select:focus {
  outline: none;
  border-color: white;
}

button:hover {
    background-color: #333;
}

.piano-output {
    margin-top: 20px;
}

pre.piano {
    font-family:
        "Consolas", "Monaco", "Lucida Console", "Liberation Mono",
        "DejaVu Sans Mono", "Bitstream Vera Sans Mono",
        "Courier New", monospace;
    white-space: pre;
    font-size: 12px;
    line-height: 1.2;
    margin: 15px 0;
    text-align: center;
    border: 0;
    border-top: 1px dashed rgba(255,255,255,.1);
    overflow-x: scroll;
}

.error {
    color: #ff6b6b;
    text-align: center;
    font-weight: bold;
}

.output-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

.copy-btn {
    background-color: rgba(255,255,255,.2);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.copy-btn:hover {
    background-color: rgba(255,255,255,.4);
}
</style>
