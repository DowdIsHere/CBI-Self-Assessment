import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChevronRight, ChevronLeft, Download, Sun, Moon, Monitor } from 'lucide-react';

const CBIAssessmentTool = () => {
  const [currentBlock, setCurrentBlock] = useState(0);
  const [responses, setResponses] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [assessmentType, setAssessmentType] = useState(null);
  const [theme, setTheme] = useState('auto');

  // Theme colors - fixed operator precedence bug
  const currentHour = new Date().getHours();
  const isDark = theme === 'dark' || (theme === 'auto' && (currentHour >= 18 || currentHour < 6));

  const colors = {
    bgPrimary: isDark ? '#0a0a0f' : '#f8f9fc',
    bgSecondary: isDark ? '#12121a' : '#eef0f5',
    bgCard: isDark ? '#1a1a24' : '#ffffff',
    bgElevated: isDark ? '#22222e' : '#ffffff',
    textPrimary: isDark ? '#f0f0f5' : '#1a1a2e',
    textSecondary: isDark ? '#a0a0b0' : '#5a5a70',
    textMuted: isDark ? '#6a6a7a' : '#8a8a9a',
    accentSpatial: isDark ? '#00d4aa' : '#00a888',
    accentTemporal: isDark ? '#ffc857' : '#d4a000',
    accentReference: isDark ? '#a855f7' : '#9333ea',
    accentClinical: isDark ? '#4da6ff' : '#2b7cd4',
    border: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    borderStrong: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
  };

  const blocks = [
    {
      name: "Perceptual Discrimination",
      region: "Visual/Sensory Cortices",
      icon: "◈",
      gradient: "spatial",
      questions: {
        child: [
          "Notices small changes in environment without being told",
          "Comments on subtle differences in colors, sounds, or textures",
          "First to spot errors or details others miss",
          "Sensitive to environmental factors (lighting, noise, clothing tags)",
          "Uses precise language to describe sensory experiences"
        ],
        adult: [
          "Automatically detects quality issues or inconsistencies",
          "Environmental sensitivity affects focus and productivity",
          "Notices subtle changes others overlook",
          "Natural attention to visual, auditory, or sensory detail",
          "Excels at tasks requiring fine discrimination"
        ]
      }
    },
    {
      name: "Sequential Processing",
      region: "Distributed Networks",
      icon: "◷",
      gradient: "temporal",
      questions: {
        child: [
          "Follows multi-step instructions easily",
          "Naturally creates ordered systems or routines",
          "Gets distressed when sequences are disrupted",
          "Remembers events as chronological stories",
          "Provides step-by-step explanations naturally"
        ],
        adult: [
          "Strong project management and organizational skills",
          "Prefers systematic, step-by-step approaches",
          "Creates detailed plans and timelines naturally",
          "Follows procedures and protocols easily",
          "Disrupted routines cause noticeable stress"
        ]
      }
    },
    {
      name: "Spatial Relationships",
      region: "Parietal Cortex",
      icon: "⬡",
      gradient: "spatial",
      questions: {
        child: [
          "Easily visualizes 3D structures mentally",
          "Excellent at puzzles and building tasks",
          "Strong navigation skills, rarely gets lost",
          "Understands how things fit together spatially",
          "Naturally organizes physical space"
        ],
        adult: [
          "Mental rotation and 3D visualization effortless",
          "Excellent navigation and spatial memory",
          "Understands geometric and spatial concepts intuitively",
          "Organizes physical space naturally and efficiently",
          "Thinks spatially about problems"
        ]
      }
    },
    {
      name: "Pattern Recognition",
      region: "Temporal/Parietal",
      icon: "◎",
      gradient: "reference",
      questions: {
        child: [
          "Quickly spots patterns without being told",
          "Makes predictions based on observed trends",
          "Connects ideas across different subjects",
          "Sorts and categorizes things spontaneously",
          "Says 'this is like when...' frequently"
        ],
        adult: [
          "Automatically detects patterns and trends",
          "Strong predictive and analytical thinking",
          "Makes connections across domains easily",
          "Recognizes similarities and analogies quickly",
          "Intuitive understanding of relationships"
        ]
      }
    },
    {
      name: "Symbolic Manipulation",
      region: "Temporal/Frontal",
      icon: "∑",
      gradient: "clinical",
      questions: {
        child: [
          "Comfortable with abstract symbols and notation",
          "Picks up math concepts quickly",
          "Enjoys wordplay and metaphorical thinking",
          "Creates own codes or notation systems",
          "Understands symbolic logic easily"
        ],
        adult: [
          "Strong with abstract and symbolic reasoning",
          "Comfortable with mathematical and logical notation",
          "Metaphorical and layered thinking natural",
          "Quickly learns new symbolic systems",
          "Thinks abstractly without concrete referents"
        ]
      }
    },
    {
      name: "Self-Reference Processing",
      region: "Prefrontal Cortex",
      icon: "◉",
      gradient: "reference",
      questions: {
        child: [
          "Notices own mistakes and adjusts strategy",
          "Talks through reasoning process",
          "Aware of what helps them learn",
          "Plans approach before starting tasks",
          "Reflects on why things worked or didn't"
        ],
        adult: [
          "Strong metacognitive awareness",
          "Monitors and adjusts strategies actively",
          "Aware of own cognitive strengths and weaknesses",
          "Plans cognitive approach systematically",
          "Learns by analyzing own thinking process"
        ]
      }
    },
    {
      name: "Social Signal Processing",
      region: "Temporal/Frontal Networks",
      icon: "⚇",
      gradient: "temporal",
      questions: {
        child: [
          "Picks up on how others are feeling easily",
          "Notices social dynamics and group tensions",
          "Adjusts behavior based on social context",
          "Anticipates how others will react",
          "Navigates complex social situations well"
        ],
        adult: [
          "Reads social cues and emotional signals automatically",
          "Navigates multi-party dynamics strategically",
          "Anticipates social consequences naturally",
          "Adjusts communication to social context",
          "Detects unspoken tension and power dynamics"
        ]
      }
    },
    {
      name: "Generative Creation",
      region: "Distributed Networks",
      icon: "✦",
      gradient: "clinical",
      questions: {
        child: [
          "Generates novel ideas and solutions spontaneously",
          "Creates elaborate imaginative scenarios",
          "Combines ideas in unexpected ways",
          "Frequently says 'what if we tried...'",
          "Comfortable with open-ended problems"
        ],
        adult: [
          "Generates multiple novel solutions easily",
          "Thinks innovatively and creatively",
          "Makes unexpected connections between ideas",
          "Comfortable with ambiguity and exploration",
          "Strong divergent thinking abilities"
        ]
      }
    }
  ];

  const getGradientColors = (gradient) => {
    switch(gradient) {
      case 'spatial': return [colors.accentSpatial, '#00b894'];
      case 'temporal': return [colors.accentTemporal, '#e67e22'];
      case 'reference': return [colors.accentReference, '#8b5cf6'];
      case 'clinical': return [colors.accentClinical, '#0ea5e9'];
      default: return [colors.accentSpatial, '#00b894'];
    }
  };

  const calculateScore = (blockIndex) => {
    const blockResponses = responses[blockIndex] || {};
    const totalQuestions = 5;
    const yesCount = Object.values(blockResponses).filter(r => r === 'yes').length;
    const sometimesCount = Object.values(blockResponses).filter(r => r === 'sometimes').length;

    const score = (yesCount * 2) + (sometimesCount * 1);
    const maxScore = totalQuestions * 2;
    const percentage = (score / maxScore) * 100;

    if (percentage >= 70) return 'high';
    if (percentage >= 40) return 'typical';
    return 'low';
  };

  const handleResponse = (questionIndex, value) => {
    setResponses({
      ...responses,
      [currentBlock]: {
        ...(responses[currentBlock] || {}),
        [questionIndex]: value
      }
    });
  };

  const nextBlock = () => {
    if (currentBlock < blocks.length - 1) {
      setCurrentBlock(currentBlock + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevBlock = () => {
    if (currentBlock > 0) {
      setCurrentBlock(currentBlock - 1);
    }
  };

  const getProfileData = () => {
    return blocks.map((block, index) => ({
      name: block.name,
      shortName: block.name.split(' ')[0],
      score: calculateScore(index),
      gradient: block.gradient,
      numericScore: (() => {
        const score = calculateScore(index);
        if (score === 'high') return 3;
        if (score === 'typical') return 2;
        return 1;
      })()
    }));
  };

  const getRecommendations = () => {
    const profile = getProfileData();
    const highBlocks = profile.filter(b => b.score === 'high').map(b => b.name);
    const lowBlocks = profile.filter(b => b.score === 'low').map(b => b.name);

    const strategies = [];

    if (highBlocks.includes('Spatial Relationships') && lowBlocks.includes('Sequential Processing')) {
      strategies.push({
        title: "Use Spatial Strength to Build Sequential Skills",
        description: "Create visual schedules, use spatial maps of procedures, organize steps in physical space"
      });
    }

    if (highBlocks.includes('Pattern Recognition') && lowBlocks.includes('Perceptual Discrimination')) {
      strategies.push({
        title: "Use Pattern Rules to Guide Perception",
        description: "Teach explicit patterns to look for, create checklists based on pattern rules"
      });
    }

    if (highBlocks.includes('Sequential Processing') && lowBlocks.includes('Spatial Relationships')) {
      strategies.push({
        title: "Use Step-by-Step Procedures for Spatial Tasks",
        description: "Break spatial problems into sequential steps, use verbal navigation instructions"
      });
    }

    if (highBlocks.includes('Generative Creation') && lowBlocks.includes('Self-Reference Processing')) {
      strategies.push({
        title: "Generate Multiple Approaches, Get External Feedback",
        description: "Leverage creative strength to create options, use external coaching for strategy selection"
      });
    }

    if (highBlocks.includes('Social Signal Processing') && lowBlocks.includes('Sequential Processing')) {
      strategies.push({
        title: "Frame Organization as Social Communication",
        description: "Use social strengths to create accountability for routines and organization"
      });
    }

    if (highBlocks.length > 0) {
      strategies.push({
        title: `Primary Strengths: ${highBlocks.join(', ')}`,
        description: "These are your cognitive highways. Use them as entry points for all learning and problem-solving."
      });
    }

    if (lowBlocks.length > 0) {
      strategies.push({
        title: `Development Areas: ${lowBlocks.join(', ')}`,
        description: "These blocks aren't missing - they're less accessible. Build bridges from your strengths."
      });
    }

    return strategies;
  };

  const cycleTheme = () => {
    if (theme === 'auto') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('auto');
  };

  const handlePrint = () => {
    const profileData = getProfileData();
    const recommendations = getRecommendations();
    const date = new Date().toLocaleDateString();

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CBI Cognitive Profile Results</title>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'DM Sans', -apple-system, sans-serif;
            color: #1a1a2e;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            padding-bottom: 24px;
            border-bottom: 2px solid #eee;
            margin-bottom: 32px;
          }
          .logo {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: #00a888;
            margin-bottom: 4px;
          }
          .subtitle {
            font-size: 0.85rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          h1 {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 1.8rem;
            margin: 24px 0 8px;
          }
          .date {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 32px;
          }
          .section {
            margin-bottom: 32px;
          }
          .section h2 {
            font-family: 'Fraunces', Georgia, serif;
            font-size: 1.2rem;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          }
          .block-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-left: 4px solid #ccc;
            margin-bottom: 8px;
            background: #f9f9f9;
          }
          .block-row.high { border-left-color: #00a888; }
          .block-row.typical { border-left-color: #2b7cd4; }
          .block-row.low { border-left-color: #d4a000; }
          .block-name {
            font-weight: 600;
          }
          .block-region {
            font-size: 0.85rem;
            color: #666;
          }
          .block-score {
            font-size: 0.85rem;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 50px;
          }
          .block-score.high { background: #e6f7f3; color: #00a888; }
          .block-score.typical { background: #e8f2fc; color: #2b7cd4; }
          .block-score.low { background: #fef6e6; color: #d4a000; }
          .recommendation {
            padding: 16px;
            background: #f9f9f9;
            border-radius: 8px;
            margin-bottom: 12px;
          }
          .recommendation h3 {
            font-size: 1rem;
            margin-bottom: 8px;
          }
          .recommendation p {
            color: #555;
            font-size: 0.95rem;
          }
          .legend {
            display: flex;
            gap: 24px;
            justify-content: center;
            margin: 24px 0;
            font-size: 0.85rem;
          }
          .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .legend-dot {
            width: 12px;
            height: 12px;
            border-radius: 3px;
          }
          .legend-dot.high { background: #00a888; }
          .legend-dot.typical { background: #2b7cd4; }
          .legend-dot.low { background: #d4a000; }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            font-size: 0.8rem;
            color: #999;
          }
          @media print {
            body { padding: 20px; }
            .block-row { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .block-score { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .legend-dot { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">The Cognition Block</div>
          <div class="subtitle">CBI Self Assessment Results</div>
        </div>

        <h1>Your Cognitive Profile</h1>
        <p class="date">Generated: ${date}</p>

        <div class="legend">
          <div class="legend-item"><div class="legend-dot high"></div> High Accessibility</div>
          <div class="legend-item"><div class="legend-dot typical"></div> Typical Accessibility</div>
          <div class="legend-item"><div class="legend-dot low"></div> Low Accessibility</div>
        </div>

        <div class="section">
          <h2>Block-by-Block Results</h2>
          ${profileData.map((block, index) => `
            <div class="block-row ${block.score}">
              <div>
                <div class="block-name">${block.name}</div>
                <div class="block-region">${blocks[index].region}</div>
              </div>
              <div class="block-score ${block.score}">
                ${block.score.charAt(0).toUpperCase() + block.score.slice(1)}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <h2>Your Personalized Strategies</h2>
          ${recommendations.map(rec => `
            <div class="recommendation">
              <h3>${rec.title}</h3>
              <p>${rec.description}</p>
            </div>
          `).join('')}
        </div>

        <div class="footer">
          © 2024-2026 Cognition Blocks LLC • cognitionblocksllc.com<br>
          U.S. Copyright Registration TXu 2-497-721
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const ThemeToggle = () => (
    <button
      onClick={cycleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '50px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        color: colors.textMuted,
        transition: 'all 0.3s ease'
      }}
    >
      {theme === 'auto' ? <Monitor size={16} /> : theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
      <span>{theme === 'auto' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}</span>
    </button>
  );

  const Header = () => (
    <header style={{
      padding: '16px 24px',
      background: isDark ? 'rgba(10, 10, 15, 0.95)' : 'rgba(248, 249, 252, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${colors.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: '1.3rem',
            fontWeight: 600,
            background: `linear-gradient(135deg, ${colors.accentSpatial}, ${colors.accentTemporal}, ${colors.accentReference})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            The Cognition Block
          </div>
          <div style={{
            fontSize: '0.65rem',
            color: colors.textMuted,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            CBI Self Assessment
          </div>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );

  // Start screen
  if (!assessmentType) {
    return (
      <div style={{
        minHeight: '100vh',
        background: colors.bgPrimary,
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        color: colors.textPrimary,
        transition: 'all 0.3s ease'
      }}>
        <Header />

        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '60px 24px'
        }}>
          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: `${colors.accentSpatial}20`,
              border: `1px solid ${colors.accentSpatial}40`,
              borderRadius: '50px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: colors.accentSpatial,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '20px'
            }}>
              Cognitive Profile Assessment
            </div>

            <h1 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '16px',
              lineHeight: 1.2
            }}>
              Discover How Your Mind{' '}
              <span style={{
                background: `linear-gradient(135deg, ${colors.accentSpatial}, ${colors.accentTemporal})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Actually Works
              </span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: colors.textSecondary,
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              Map your cognitive architecture across 8 parallel processing blocks. Understand your strengths and build personalized strategies.
            </p>
          </div>

          {/* Selection Cards */}
          <div style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '1.3rem',
              marginBottom: '20px',
              color: colors.textPrimary
            }}>
              Who are you assessing?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { type: 'child', title: 'A Child or Student', subtitle: 'Ages 3-18' },
                { type: 'adult', title: 'Myself or Another Adult', subtitle: 'Ages 18+' }
              ].map((option) => (
                <button
                  key={option.type}
                  onClick={() => setAssessmentType(option.type)}
                  style={{
                    padding: '20px 24px',
                    background: colors.bgSecondary,
                    border: `2px solid ${colors.border}`,
                    borderRadius: '16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    color: colors.textPrimary
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = colors.accentSpatial;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>
                    {option.title}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: colors.textSecondary }}>
                    {option.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <div style={{
            background: `${colors.accentTemporal}15`,
            border: `1px solid ${colors.accentTemporal}30`,
            borderRadius: '16px',
            padding: '20px 24px'
          }}>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time</div>
                <div style={{ fontWeight: 600, color: colors.textPrimary }}>10-15 min</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Questions</div>
                <div style={{ fontWeight: 600, color: colors.textPrimary }}>40 behaviors</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Result</div>
                <div style={{ fontWeight: 600, color: colors.textPrimary }}>Full profile + strategies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const profileData = getProfileData();
    const recommendations = getRecommendations();

    const getScoreColor = (score) => {
      if (score === 'high') return colors.accentSpatial;
      if (score === 'typical') return colors.accentClinical;
      return colors.accentTemporal;
    };

    return (
      <div style={{
        minHeight: '100vh',
        background: colors.bgPrimary,
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        color: colors.textPrimary,
        transition: 'all 0.3s ease'
      }}>
        <Header />

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px 24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '2.2rem',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              Your{' '}
              <span style={{
                background: `linear-gradient(135deg, ${colors.accentSpatial}, ${colors.accentTemporal}, ${colors.accentReference})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Cognitive Profile
              </span>
            </h1>
            <p style={{ color: colors.textSecondary }}>
              Based on observable behaviors across 8 parallel cognitive blocks
            </p>
          </div>

          {/* Profile Chart */}
          <div style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '1.3rem',
              marginBottom: '24px'
            }}>
              Accessibility Profile
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={profileData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                <XAxis
                  type="number"
                  domain={[0, 3]}
                  ticks={[1, 2, 3]}
                  tick={{ fill: colors.textMuted }}
                  axisLine={{ stroke: colors.border }}
                />
                <YAxis
                  dataKey="shortName"
                  type="category"
                  width={100}
                  tick={{ fill: colors.textSecondary, fontSize: 12 }}
                  axisLine={{ stroke: colors.border }}
                />
                <Tooltip
                  contentStyle={{
                    background: colors.bgElevated,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    color: colors.textPrimary
                  }}
                  formatter={(value) => {
                    if (value === 3) return ['High Accessibility', 'Level'];
                    if (value === 2) return ['Typical Accessibility', 'Level'];
                    return ['Low Accessibility', 'Level'];
                  }}
                />
                <Bar dataKey="numericScore" radius={[0, 8, 8, 0]}>
                  {profileData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getScoreColor(entry.score)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              marginTop: '20px',
              flexWrap: 'wrap'
            }}>
              {[
                { label: 'High Accessibility', color: colors.accentSpatial },
                { label: 'Typical Accessibility', color: colors.accentClinical },
                { label: 'Low Accessibility', color: colors.accentTemporal }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    background: item.color,
                    borderRadius: '4px'
                  }} />
                  <span style={{ fontSize: '0.85rem', color: colors.textSecondary }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Block Details */}
          <div style={{
            background: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '1.3rem',
              marginBottom: '20px'
            }}>
              Block-by-Block Results
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {profileData.map((block, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px 20px',
                    background: colors.bgSecondary,
                    borderRadius: '12px',
                    borderLeft: `4px solid ${getScoreColor(block.score)}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '2px' }}>{block.name}</div>
                    <div style={{ fontSize: '0.85rem', color: colors.textMuted }}>{blocks[index].region}</div>
                  </div>
                  <div style={{
                    padding: '6px 14px',
                    background: `${getScoreColor(block.score)}20`,
                    color: getScoreColor(block.score),
                    borderRadius: '50px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    {block.score.charAt(0).toUpperCase() + block.score.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div style={{
            background: `linear-gradient(135deg, ${colors.accentSpatial}15, ${colors.accentReference}15)`,
            border: `1px solid ${colors.accentSpatial}30`,
            borderRadius: '24px',
            padding: '32px',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '1.4rem',
              marginBottom: '20px'
            }}>
              Your Personalized Strategies
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  style={{
                    background: colors.bgCard,
                    borderRadius: '16px',
                    padding: '20px',
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <div style={{
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: colors.textPrimary
                  }}>
                    {rec.title}
                  </div>
                  <div style={{
                    color: colors.textSecondary,
                    lineHeight: 1.6
                  }}>
                    {rec.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
          }} className="no-print">
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentBlock(0);
                setResponses({});
                setAssessmentType(null);
              }}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '16px 24px',
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '50px',
                color: colors.textPrimary,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Start New Assessment
            </button>
            <button
              onClick={handlePrint}
              style={{
                flex: 1,
                minWidth: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '16px 24px',
                background: `linear-gradient(135deg, ${colors.accentSpatial}, #00b894)`,
                border: 'none',
                borderRadius: '50px',
                color: colors.bgPrimary,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Download size={18} />
              Print Results
            </button>
            <a href="https://cognitionblocksllc.com/cbi-overview">
                <button>
              onClick={() => {
                setShowResults(false);
                setCurrentBlock(0);
                setResponses({});
                setAssessmentType(null);
              }}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '16px 24px',
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: '50px',
                color: colors.textPrimary,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
             Explore the Science
            </button>
            </a>
          </div>

          {/* Print Styles */}
          <style>{`
            @media print {
              body {
                background: white !important;
                color: black !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              .no-print {
                display: none !important;
              }

              header {
                position: relative !important;
                background: white !important;
                border-bottom: 2px solid #ccc !important;
              }

              * {
                background: white !important;
                color: black !important;
                box-shadow: none !important;
              }

              /* Keep colored borders for block results */
              [style*="border-left: 4px"] {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }

              /* Status badges */
              [style*="border-radius: 50px"][style*="padding: 6px 14px"] {
                border: 2px solid currentColor !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Assessment questions
  const currentBlockData = blocks[currentBlock];
  const questions = assessmentType === 'child' ? currentBlockData.questions.child : currentBlockData.questions.adult;
  const currentResponses = responses[currentBlock] || {};
  const allAnswered = questions.every((_, i) => currentResponses[i]);
  const [gradientStart, gradientEnd] = getGradientColors(currentBlockData.gradient);

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bgPrimary,
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: colors.textPrimary,
      transition: 'all 0.3s ease'
    }}>
      <Header />

      <div style={{
        maxWidth: '750px',
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        {/* Progress */}
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '12px',
            fontSize: '0.85rem',
            color: colors.textSecondary
          }}>
            <span>Block {currentBlock + 1} of {blocks.length}</span>
            <span>{Math.round((currentBlock / blocks.length) * 100)}% Complete</span>
          </div>
          <div style={{
            height: '6px',
            background: colors.bgSecondary,
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(currentBlock / blocks.length) * 100}%`,
              background: `linear-gradient(90deg, ${colors.accentSpatial}, ${colors.accentTemporal})`,
              borderRadius: '3px',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>

        {/* Question Card */}
        <div style={{
          background: colors.bgCard,
          border: `1px solid ${colors.border}`,
          borderRadius: '24px',
          overflow: 'hidden'
        }}>
          {/* Block Header */}
          <div style={{
            padding: '32px',
            background: `linear-gradient(135deg, ${gradientStart}20, ${gradientEnd}10)`,
            borderBottom: `1px solid ${colors.border}`
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '12px'
            }}>
              {currentBlockData.icon}
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: gradientStart,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px'
            }}>
              {currentBlockData.region}
            </div>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '1.8rem',
              fontWeight: 700,
              marginBottom: '8px'
            }}>
              {currentBlockData.name}
            </h2>
            <p style={{ color: colors.textSecondary }}>
              Answer based on what you typically observe
            </p>
          </div>

          {/* Questions */}
          <div style={{ padding: '32px' }}>
            {questions.map((question, index) => (
              <div
                key={index}
                style={{
                  paddingBottom: '24px',
                  marginBottom: '24px',
                  borderBottom: index < questions.length - 1 ? `1px solid ${colors.border}` : 'none'
                }}
              >
                <div style={{
                  fontWeight: 500,
                  marginBottom: '16px',
                  lineHeight: 1.5
                }}>
                  {question}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['yes', 'sometimes', 'no'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleResponse(index, option)}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: `2px solid ${currentResponses[index] === option ? gradientStart : colors.border}`,
                        background: currentResponses[index] === option ? `${gradientStart}20` : colors.bgSecondary,
                        color: currentResponses[index] === option ? gradientStart : colors.textSecondary,
                        fontWeight: currentResponses[index] === option ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: '24px',
              borderTop: `1px solid ${colors.border}`
            }}>
              <button
                onClick={prevBlock}
                disabled={currentBlock === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  borderRadius: '50px',
                  border: 'none',
                  background: currentBlock === 0 ? colors.bgSecondary : colors.bgElevated,
                  color: currentBlock === 0 ? colors.textMuted : colors.textPrimary,
                  fontWeight: 600,
                  cursor: currentBlock === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentBlock === 0 ? 0.5 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <button
                onClick={nextBlock}
                disabled={!allAnswered}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 24px',
                  borderRadius: '50px',
                  border: 'none',
                  background: !allAnswered ? colors.bgSecondary : `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
                  color: !allAnswered ? colors.textMuted : colors.bgPrimary,
                  fontWeight: 600,
                  cursor: !allAnswered ? 'not-allowed' : 'pointer',
                  opacity: !allAnswered ? 0.5 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                {currentBlock === blocks.length - 1 ? 'See Results' : 'Next'}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CBIAssessmentTool;
