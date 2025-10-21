# PITCH DECK CREATION PROMPT FOR CLAUDE

**Purpose**: Use this prompt to have Claude Sonnet (or another AI) create the actual pitch deck slides from the PITCH_ANSWERS.md document.

**Instructions**: Copy the prompt below and paste it into a new Claude conversation, along with the contents of PITCH_ANSWERS.md.

---

## THE PROMPT (Copy everything below this line)

```
I need you to create a 15-slide pitch deck for Machine King Labs based on the comprehensive pitch answers document I'm providing.

# CONTEXT
- **Company**: Machine King Labs (AI innovation lab)
- **Stage**: Pre-traction, post-beta launch
- **Ask**: $850K seed round
- **Audience**: Pitch competition judges, potential angel investors, VCs
- **Goal**: Position as high-execution team with blue ocean opportunity

# TONE & STYLE REQUIREMENTS

**Tone**: Confident but not arrogant. Data-driven, not hyperbolic.
- Use specific numbers and metrics ("13% response rate vs 2-5% industry average")
- Avoid fluff words like "revolutionary," "game-changing," "disrupting" unless backed by data
- Sound like a founder who's ALREADY shipping, not dreaming

**Visual Direction**:
- Dark/modern aesthetic (black backgrounds, white/blue text)
- Minimal text per slide (5-7 bullet points MAX)
- Bold headlines that make the point even if you don't read the body

**Slide Format**:
Each slide should have:
1. **Headline** (1 short sentence that makes the point)
2. **Body Content** (3-7 bullet points, short and punchy)
3. **Visual Suggestion** (what chart, diagram, or image would work here)

# SLIDE STRUCTURE (15 slides)

Create content for these 15 slides:

## SLIDE 1: TITLE
- Company name
- Tagline
- Ask (amount raising)
- Founder name + title

## SLIDE 2: THE HOOK
- Lead with the most compelling fact about Machine King Labs
- Should answer: "Why should I keep listening?"

## SLIDE 3: THE PROBLEM (Multi-Domain)
- 2-3 problems we're solving
- Pain points with specific data
- "Who feels this pain?" personas

## SLIDE 4: THE SOLUTION
- How Machine King Labs solves these problems
- Focus on EXECUTION SPEED as our core differentiator
- Mention both products briefly

## SLIDE 5: PRODUCTS & TRACTION
- Hey You're Hired details
- TalkAdvantage Pro details
- Algorithm Institute mention
- Key metrics for each

## SLIDE 6: MARKET OPPORTUNITY
- TAM/SAM/SOM breakdown
- Market size numbers ($94.6B TAM)
- Growth trajectory

## SLIDE 7: WHY NOW?
- 5 converging trends
- Why this opportunity won't last
- Why we're positioned to win NOW

## SLIDE 8: BUSINESS MODEL
- How we make money (subscription SaaS)
- Pricing for each product
- Revenue projections (18-month)

## SLIDE 9: COMPETITIVE ADVANTAGE (Part 1)
- Patent-pending IP
- Execution speed (2.5x faster)
- Security-first architecture

## SLIDE 10: COMPETITIVE ADVANTAGE (Part 2)
- Competitive comparison tables
- Show the GAP (zero real-time meeting intelligence competitors)
- Multi-domain validation

## SLIDE 11: GO-TO-MARKET STRATEGY
- Customer acquisition plan
- Paid ads, content, partnerships
- CAC/LTV economics

## SLIDE 12: TEAM
- Founder + 2 key team members
- Credentials that matter
- Why THIS team can execute

## SLIDE 13: FINANCIAL PROJECTIONS
- 18-month revenue trajectory
- Burn rate and runway
- Path to Series A

## SLIDE 14: THE ASK
- $850K seed round
- Use of funds breakdown (60% team, 25% marketing, 10% product, 5% ops)
- Milestones we'll hit

## SLIDE 15: VISION & CONTACT
- 3-5 year vision (acquisition exit recommended)
- Contact info
- Call to action

# OUTPUT FORMAT

For each slide, provide:

```
## SLIDE X: [TITLE]

**Headline**: [One punchy sentence]

**Body Content**:
- Bullet point 1
- Bullet point 2
- Bullet point 3
- etc.

**Visual Suggestion**: [Description of chart/diagram/image]

**Speaker Notes**: [What to SAY during this slide - 30-60 seconds of talking points]
```

# SPECIFIC REQUIREMENTS

1. **Keep it concise**: No slide should have more than 50 words of body text
2. **Lead with impact**: Every headline should make the point without reading the bullets
3. **Use data**: Include specific numbers where possible (13%, $850K, 18 months, etc.)
4. **Avoid jargon**: No AI buzzwords unless necessary. Speak plainly.
5. **Call out the gap**: Emphasize ZERO real-time meeting intelligence competitors
6. **Frame pre-traction positively**: "Just launched" not "no customers yet"

# POSITIONING REMINDERS

- We're pre-traction but POST-beta (platforms are live, just not scaling yet)
- Our unfair advantage is SPEED (2.5x faster than competitors)
- TalkAdvantage Pro is a BLUE OCEAN (no real-time competitors)
- We're not a single-product company, we're an AI innovation lab
- Asking for $850K to reach $2M+ ARR in 18 months

# SOURCE MATERIAL

[PASTE THE ENTIRE PITCH_ANSWERS.MD FILE HERE]

---

Now create the 15-slide pitch deck following this structure and requirements.
```

---

## HOW TO USE THIS PROMPT

### Step 1: Copy the Prompt
Copy everything between the code blocks above (starting with "I need you to create...")

### Step 2: Open Claude Sonnet
Go to claude.ai or use Claude Code

### Step 3: Paste Context First
1. Paste the prompt
2. Then paste the ENTIRE contents of PITCH_ANSWERS.md below it

### Step 4: Review Output
Claude will give you 15 slides with:
- Headlines
- Bullet points
- Visual suggestions
- Speaker notes

### Step 5: Refine
If any slide is too wordy or off-tone, ask Claude:
- "Make Slide 8 more concise"
- "Slide 3 needs more data, less fluff"
- "Rewrite Slide 12 to emphasize execution speed"

### Step 6: Export to Google Slides / PowerPoint
Once you're happy with the content, copy each slide into your presentation software.

---

## ALTERNATIVE: SLIDE DECK DESIGN SERVICES

If you want a professional designer to create the actual deck:

**Option 1: Fiverr** ($50-$200)
- Search "pitch deck design"
- Provide the 15 slides from Claude as content
- Designer creates professional visuals

**Option 2: Canva** (DIY, $0-$15/month)
- Use Canva's pitch deck templates
- Copy Claude's content into template slides
- Export as PDF or PowerPoint

**Option 3: Gamma.app** (AI-powered, $0-$20/month)
- Paste Claude's slide content
- Gamma generates entire deck automatically
- Adjust styling and export

---

## TIPS FOR GOOD PROMPTING

### If Claude's output is too generic:
```
"Rewrite with MORE specific data from PITCH_ANSWERS.md.
Use exact numbers: 13% response rate, $850K raise, 18 months, etc."
```

### If slides are too wordy:
```
"Each slide should have MAX 5 bullet points, each under 10 words.
Headlines should be 6 words or less."
```

### If tone is too salesy:
```
"Sound like a confident founder reporting facts, not a marketer selling dreams.
Remove words like 'revolutionary' and 'game-changing'."
```

### If you want more visuals:
```
"For each slide, suggest a specific chart type or diagram.
Example: 'Slide 6 should have a funnel diagram showing TAM->SAM->SOM'."
```

### If you need speaker notes:
```
"Add speaker notes for each slide.
What should I SAY during this slide? 30-60 seconds of talking points."
```

---

## EXAMPLE OUTPUT (What you should expect)

```
## SLIDE 3: THE PROBLEM

**Headline**: Companies Take 18 Months to Ship AI. The Window Closes Fast.

**Body Content**:
- Job search: 95% of applications ignored (2-5% response rate)
- Meeting intelligence: All insights come AFTER meetings end (too late for sales)
- AI shipping cycles: 18-24 months standard (opportunity window closes)
- Professionals need Fortune 500 response rates NOW
- Sales teams need real-time coaching, not post-game analysis

**Visual Suggestion**:
Three-panel problem visualization showing:
1. Job seeker applying to 100 jobs → 2-5 responses
2. Sales rep getting Gong insights 24 hours after losing deal
3. Timeline showing 18-month shipping cycle vs 6-month opportunity window

**Speaker Notes**:
"Here's the problem. If you're looking for a $200K job at a Fortune 500 company,
you'll apply to 100 positions and get 2-5 responses. Industry average.
And if you're a sales manager, every meeting intelligence tool gives you insights
AFTER the call ends. By then, you've already lost the deal.
And if you're a company trying to ship AI products? 18 to 24 months is standard.
By the time you launch, the opportunity is gone. That's what we're solving."
```

---

## TROUBLESHOOTING

**Problem**: Claude gives generic startup advice instead of using your specific data
**Solution**: Say "Use ONLY information from PITCH_ANSWERS.md. Do not add generic startup facts."

**Problem**: Slides are too long (10+ bullet points)
**Solution**: Say "Maximum 5 bullets per slide. Each bullet under 10 words. Cut ruthlessly."

**Problem**: Tone sounds desperate or begging
**Solution**: Say "Sound confident. We're ALREADY shipping. Investors join us or miss out."

**Problem**: Missing key differentiators
**Solution**: Say "Every slide must mention either: execution speed, patent pending, or blue ocean."

---

## FINAL CHECKLIST

Before you finalize the deck, verify:

- [ ] Every slide has ≤5 bullet points
- [ ] Headline makes sense without reading bullets
- [ ] Specific numbers used (13%, $850K, 18 months, 31K subscribers)
- [ ] Slide 9-10 emphasize ZERO real-time competitors
- [ ] Slide 12 shows team credentials that matter
- [ ] Slide 14 clearly states $850K ask and use of funds
- [ ] No slide uses words like "revolutionary" without data backing it
- [ ] Speaker notes are 30-60 seconds per slide
- [ ] Visual suggestions are specific (not "use a chart" but "funnel diagram showing TAM/SAM/SOM")

---

*Ready to create your deck? Copy the prompt above and paste into Claude!*
