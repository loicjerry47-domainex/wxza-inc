
import React, { useRef, useEffect } from 'react';

// --- Grid and Particle Settings ---
const GRID_SPACING = 20;
const PARTICLE_COLOR_BLUE = 'rgba(59, 130, 246, 0.7)';
const PARTICLE_COLOR_WHITE = 'rgba(255, 255, 255, 0.7)';
const GRID_COLOR = 'rgba(255, 255, 255, 0.03)';

// --- Formation Settings ---
const FORMATION_INTERVAL = 20000; 
const TRANSITION_DURATION = 3500; 
const HOLD_DURATION = 6000; 

type AnimationState = 'AMBIENT' | 'FORMING' | 'HOLDING' | 'DISPERSING';

const getWxzaPoints = (canvasWidth: number, canvasHeight: number) => {
    const allPoints: {x: number, y: number, isBlurred: boolean}[] = [];

    const generateTemplatePoints = () => {
        const fontSize = 100;
        const font = `bold ${fontSize}px "Times New Roman", Times, serif`;
        const text = "WXZA";

        const tempCanvas = document.createElement('canvas');
        const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return { points: [], width: 0 };

        ctx.font = font;
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = fontSize;

        tempCanvas.width = Math.ceil(textWidth * 1.2);
        tempCanvas.height = Math.ceil(textHeight * 1.5);

        ctx.font = font;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);

        const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        const points: {x: number, y: number}[] = [];
        const w = tempCanvas.width;
        const h = tempCanvas.height;
        const threshold = 128;

        const isSolid = (x: number, y: number) => {
            if (x < 0 || y < 0 || x >= w || y >= h) return false;
            return data[(y * w + x) * 4 + 3] > threshold;
        };

        const step = 2; 
        for (let y = 0; y < h; y += step) {
            for (let x = 0; x < w; x += step) {
                if (isSolid(x, y)) {
                    if (!isSolid(x + step, y) || !isSolid(x - step, y) || 
                        !isSolid(x, y + step) || !isSolid(x, y - step)) {
                        points.push({ x: x - w / 2, y: y - h / 2 });
                    }
                }
            }
        }
        return { points, width: textWidth };
    };

    const template = generateTemplatePoints();
    if (template.points.length === 0) return [];

    const minDim = Math.min(canvasWidth, canvasHeight);
    const centerScale = (minDim * 0.85) / template.width;
    const sideScale = (minDim * 0.30) / template.width;

    const safeW = canvasWidth * 0.8; 
    const safeH = canvasHeight * 0.8;
    const offX = (canvasWidth - safeW) / 2;
    const offY = (canvasHeight - safeH) / 2;

    const positions = [
        { x: canvasWidth * 0.5, y: canvasHeight * 0.5, scale: centerScale, isCenter: true },
        { x: offX, y: offY, scale: sideScale, isCenter: false }, 
        { x: offX + safeW, y: offY, scale: sideScale, isCenter: false },
        { x: offX, y: offY + safeH, scale: sideScale, isCenter: false },
        { x: offX + safeW, y: offY + safeH, scale: sideScale, isCenter: false },
    ];

    positions.forEach(pos => {
        template.points.forEach((p, i) => {
            if (!pos.isCenter && (i % 2 !== 0)) return;
            allPoints.push({
                x: pos.x + p.x * pos.scale,
                y: pos.y + p.y * pos.scale,
                isBlurred: !pos.isCenter
            });
        });
    });

    return allPoints;
};

const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

class Shockwave {
    x: number;
    y: number;
    radius: number = 0;
    maxRadius: number;
    speed: number;
    opacity: number = 1;
    width: number;
    systemLevel: number;

    constructor(canvasWidth: number, canvasHeight: number, isAmeliorating: boolean, systemLevel: number = 1) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.maxRadius = Math.sqrt(canvasWidth**2 + canvasHeight**2) * 0.7;
        this.systemLevel = systemLevel;
        
        if (isAmeliorating) {
            this.speed = 6 + Math.random() * 6;
        } else {
            this.speed = 2.0 + Math.random() * 2.0; 
        }
        
        this.width = 400; // Increased influence for smoother activation falloff
    }

    update() {
        this.radius += this.speed;
        this.opacity = 1 - Math.pow(this.radius / this.maxRadius, 2);
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;
        
        const isFast = this.speed > 4;
        const baseOpacity = isFast ? this.opacity * 0.45 : this.opacity * 0.25;

        // 1. Refraction Ring (Deep, faint, wide)
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.radius * 0.94), 0, Math.PI * 2);
        ctx.strokeStyle = this.systemLevel >= 8 ? `rgba(139, 92, 246, ${baseOpacity * 0.05})` : `rgba(59, 130, 246, ${baseOpacity * 0.05})`;
        ctx.lineWidth = 15;
        ctx.stroke();

        // 2. Main Wave Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.systemLevel >= 8 ? `rgba(139, 92, 246, ${baseOpacity})` : `rgba(59, 130, 246, ${baseOpacity})`; 
        ctx.lineWidth = 2 + (this.radius / 150); 
        ctx.stroke();

        // 3. Liquid Glass Highlight (Sharp, bright meniscus)
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.radius - 2), 0, Math.PI * 2);
        ctx.strokeStyle = this.systemLevel >= 8 ? `rgba(234, 179, 8, ${Math.min(1, baseOpacity * 2.5)})` : `rgba(165, 243, 252, ${Math.min(1, baseOpacity * 2.5)})`; // Gold or Cyan-200
        ctx.lineWidth = 1.2;
        ctx.stroke();
        
        // 4. Atmospheric Glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = this.systemLevel >= 8 ? `rgba(124, 58, 237, ${baseOpacity * 0.1})` : `rgba(37, 99, 235, ${baseOpacity * 0.1})`;
        ctx.lineWidth = 10;
        ctx.stroke();
    }
}

class Particle {
    x: number; y: number;
    vx: number; vy: number;
    targetX: number; targetY: number;
    formationX: number = 0; formationY: number = 0;
    originX: number = 0; originY: number = 0;
    controlX: number = 0; controlY: number = 0; 
    canvasWidth: number; canvasHeight: number;
    color: string;
    isPaused: boolean = false;
    pauseEndTime: number = 0;
    lastIntersectionX: number;
    lastIntersectionY: number;
    randomOffset: number;
    wobblePhase: number;
    speed: number;
    isBlurred: boolean = false;
    
    constructor(canvasWidth: number, canvasHeight: number, systemLevel: number = 1) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // At higher levels, introduce purple/gold colors
        if (systemLevel >= 8 && Math.random() > 0.7) {
            this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.7)' : 'rgba(234, 179, 8, 0.7)'; // Purple or Gold
        } else {
            this.color = Math.random() > 0.5 ? PARTICLE_COLOR_BLUE : PARTICLE_COLOR_WHITE;
        }
        
        this.randomOffset = Math.random() * 1000;
        this.wobblePhase = Math.random() * Math.PI * 2;
        this.speed = 0.1 + Math.random() * 1.4; 
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.floor(Math.random() * (this.canvasWidth / GRID_SPACING)) * GRID_SPACING;
        this.y = Math.floor(Math.random() * (this.canvasHeight / GRID_SPACING)) * GRID_SPACING;
        this.speed = 0.1 + Math.random() * 1.4; 
        
        this.lastIntersectionX = this.x;
        this.lastIntersectionY = this.y;
        if (initial) {
            this.targetX = this.x;
            this.targetY = this.y;
        }
        this.vx = 0;
        this.vy = 0;
        this.isPaused = false;
        this.setNewTarget();
    }

    setNewTarget() {
        if (Math.random() < 0.05) {
            this.isPaused = true;
            this.pauseEndTime = Date.now() + Math.random() * 1000 + 500;
            this.vx = 0; this.vy = 0;
            return;
        }
        const directions = [];
        if (this.vx === 0) {
            directions.push({ vx: this.speed, vy: 0 }, { vx: -this.speed, vy: 0 });
        }
        if (this.vy === 0) {
            directions.push({ vx: 0, vy: this.speed }, { vx: 0, vy: -this.speed });
        }
        const validDirections = directions.filter(d => d.vx !== -this.vx || d.vy !== -this.vy);
        const direction = validDirections[Math.floor(Math.random() * validDirections.length)] || {vx: 0, vy: 0};
        this.vx = direction.vx; this.vy = direction.vy;
        
        if (this.speed > 0) {
            const dirX = this.vx / this.speed;
            const dirY = this.vy / this.speed;
            this.targetX = this.x + dirX * GRID_SPACING;
            this.targetY = this.y + dirY * GRID_SPACING;
        } else {
            this.targetX = this.x;
            this.targetY = this.y;
        }
    }

    update(state: AnimationState, progress: number, litSegments: Map<string, { opacity: number }>, surgeFactor: number, isAmeliorating: boolean, isDormant: boolean = false) {
        switch(state) {
            case 'AMBIENT':
                if (this.isPaused && !isAmeliorating && !isDormant) {
                    if (Date.now() > this.pauseEndTime) {
                        this.isPaused = false;
                        this.setNewTarget();
                    }
                    return;
                }
                const currentSurge = isDormant ? surgeFactor * 2.5 : surgeFactor;
                this.x += this.vx * currentSurge;
                this.y += this.vy * currentSurge;
                
                const tolerance = Math.max(0.5, this.speed * 1.1 * currentSurge);
                const dist = Math.abs(this.x - this.targetX) + Math.abs(this.y - this.targetY);
                
                if (dist < tolerance) {
                     this.x = this.targetX; this.y = this.targetY;
                     
                     const startX = this.lastIntersectionX;
                     const startY = this.lastIntersectionY;
                     let key;
                     if (startX !== this.x) {
                         key = `h-${startY}-${Math.min(startX, this.x)}`;
                     } else if (startY !== this.y) {
                         key = `v-${startX}-${Math.min(startY, this.y)}`;
                     }
                     if (key) {
                         litSegments.set(key, { opacity: isDormant ? 2.0 : 1.0 });
                     }
                     
                     this.lastIntersectionX = this.x;
                     this.lastIntersectionY = this.y;

                     if (this.targetX < 0 || this.targetX > this.canvasWidth || this.targetY < 0 || this.targetY > this.canvasHeight) {
                        this.reset();
                     } else { this.setNewTarget(); }
                }
                break;
            case 'FORMING':
                const t = easeInOutCubic(progress);
                const invT = 1 - t;
                const bezierX = (invT * invT * this.originX) + (2 * invT * t * this.controlX) + (t * t * this.formationX);
                const bezierY = (invT * invT * this.originY) + (2 * invT * t * this.controlY) + (t * t * this.formationY);
                const wobbleAmp = 15 * (1 - t); 
                const wobbleFreq = 8;
                this.x = bezierX + Math.sin(t * wobbleFreq + this.wobblePhase) * wobbleAmp;
                this.y = bezierY + Math.cos(t * wobbleFreq + this.wobblePhase) * wobbleAmp;
                break;
            case 'HOLDING':
                const time = Date.now();
                const breathScale = 1.0 + Math.sin(time * 0.001) * 0.01; 
                const cx = this.canvasWidth / 2, cy = this.canvasHeight / 2;
                this.x = cx + (this.formationX - cx) * breathScale + Math.sin((this.formationX - cx) * 0.008 + time * 0.0015) * 2.5;
                this.y = cy + (this.formationY - cy) * breathScale + Math.cos((this.formationY - cy) * 0.008 + time * 0.0015) * 2.5;
                break;
            case 'DISPERSING':
                const ed = easeInOutCubic(progress);
                this.x = this.originX + (this.targetX - this.originX) * ed;
                this.y = this.originY + (this.targetY - this.originY) * ed;
                break;
        }
    }

    draw(ctx: CanvasRenderingContext2D, state: AnimationState, surgeFactor: number, isAmeliorating: boolean, waves: Shockwave[], isDormant: boolean = false) {
        let waveIntensity = 0.0;

        if (state === 'AMBIENT' || isAmeliorating) {
            if (isDormant) {
                waveIntensity = 1.0;
            } else if (waves.length > 0) {
                const cx = this.canvasWidth / 2, cy = this.canvasHeight / 2;
                const distFromCenter = Math.sqrt((this.x - cx)**2 + (this.y - cy)**2);
                for (const wave of waves) {
                    const distToWave = Math.abs(distFromCenter - wave.radius);
                    if (distToWave < wave.width) {
                        waveIntensity = Math.max(waveIntensity, Math.pow(1 - distToWave / wave.width, 3) * wave.opacity);
                    }
                }
            }
        } else {
            waveIntensity = 1.0;
        }

        if (state === 'AMBIENT' || isAmeliorating) {
            const isBlue = this.color.includes('246');
            const rgb = isDormant ? '6, 182, 212' : (isBlue ? '59, 130, 246' : '255, 255, 255');
            const baseAlpha = isDormant ? 0.8 : 0.08; 
            const finalAlpha = Math.min(1.0, baseAlpha + waveIntensity * 0.9);

            if ((this.vx !== 0 || this.vy !== 0 || isAmeliorating) && !isDormant && waveIntensity > 0.01) {
                const surgeMult = isAmeliorating ? 3.0 : 1.5;
                const tailLength = 70 * this.speed * surgeMult * waveIntensity;
                const dx = Math.sign(this.vx) || 0, dy = Math.sign(this.vy) || 0;
                
                if (dx !== 0 || dy !== 0) {
                    const shiftRgb = isBlue ? '6, 182, 212' : '255, 255, 255';
                    const grad = ctx.createLinearGradient(this.x - dx * tailLength, this.y - dy * tailLength, this.x, this.y);
                    grad.addColorStop(0, `rgba(${shiftRgb}, 0)`);
                    grad.addColorStop(1, `rgba(${rgb}, ${waveIntensity * 0.85})`); 
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 1.4; 
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(this.x - dx * tailLength, this.y - dy * tailLength);
                    ctx.lineTo(this.x, this.y);
                    ctx.stroke();
                }
            }

            ctx.fillStyle = `rgba(${rgb}, ${finalAlpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, isDormant ? 2.0 : 1.4, 0, Math.PI * 2);
            ctx.fill();
            
            if (isDormant) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, 0.4)`;
                ctx.fill();
            }
        } else {
            if (this.isBlurred) {
                ctx.fillStyle = this.color.replace('0.7', '0.08'); 
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, state === 'HOLDING' ? 1.4 : 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

class BrainNode {
    id: string;
    label: string;
    gridX: number;
    gridY: number;
    color: string;
    x: number = 0;
    y: number = 0;
    
    baseAngle: number = 0;
    currentAngle: number = 0;
    orbitRadius: number = 0;
    orbitSpeed: number = 0;
    currentGridX: number = 0;
    currentGridY: number = 0;

    constructor(id: string, label: string, gridX: number, gridY: number, color: string) {
        this.id = id;
        this.label = label;
        this.gridX = gridX;
        this.gridY = gridY;
        this.color = color;
        
        this.currentGridX = gridX;
        this.currentGridY = gridY;
        this.baseAngle = Math.atan2(gridY, gridX);
        this.currentAngle = this.baseAngle;
        this.orbitRadius = Math.sqrt(gridX * gridX + gridY * gridY);
        this.orbitSpeed = this.orbitRadius > 0 ? (0.002 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : -1) : 0;
    }

    updatePosition(canvasWidth: number, canvasHeight: number, animationState: AnimationState) {
        const cx = Math.floor(canvasWidth / 2 / GRID_SPACING) * GRID_SPACING;
        const cy = Math.floor(canvasHeight / 2 / GRID_SPACING) * GRID_SPACING;
        
        if (this.id === 'core') {
            this.x = cx;
            this.y = cy;
        } else {
            if (animationState === 'AMBIENT') {
                this.currentAngle += this.orbitSpeed;
                const targetX = this.orbitRadius * Math.cos(this.currentAngle);
                const targetY = this.orbitRadius * Math.sin(this.currentAngle);
                this.currentGridX += (targetX - this.currentGridX) * 0.02;
                this.currentGridY += (targetY - this.currentGridY) * 0.02;
            } else {
                this.currentGridX += (this.gridX - this.currentGridX) * 0.05;
                this.currentGridY += (this.gridY - this.currentGridY) * 0.05;
                this.currentAngle = Math.atan2(this.currentGridY, this.currentGridX);
            }
            
            this.x = cx + this.currentGridX * GRID_SPACING;
            this.y = cy + this.currentGridY * GRID_SPACING;
        }
    }

    draw(ctx: CanvasRenderingContext2D, waves: Shockwave[], isLeapMode: boolean) {
        let waveIntensity = 0.0;
        for (const wave of waves) {
            const distFromCenter = Math.sqrt((this.x - wave.x)**2 + (this.y - wave.y)**2);
            const distToWave = Math.abs(distFromCenter - wave.radius);
            const activationWidth = 120; // Tighter activation for brain nodes
            if (distToWave < activationWidth) {
                waveIntensity = Math.max(waveIntensity, Math.pow(1 - distToWave / activationWidth, 3) * wave.opacity);
            }
        }

        const baseRadius = 1.4;
        const activeRadius = baseRadius + waveIntensity * (this.id === 'core' ? 8 : 6);

        ctx.beginPath();
        ctx.arc(this.x, this.y, activeRadius, 0, Math.PI * 2);
        
        if (waveIntensity > 0.01) {
            const glowIntensity = waveIntensity;
            
            // Base particle
            ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.fill();
            
            // Colored overlay
            ctx.globalAlpha = glowIntensity;
            ctx.fillStyle = this.color;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 15 * glowIntensity;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1.0;

            if (this.label && waveIntensity > 0.1) {
                ctx.fillStyle = `rgba(255, 255, 255, ${glowIntensity})`;
                ctx.font = '11px monospace';
                ctx.textAlign = 'center';
                ctx.fillText(this.label, this.x, this.y - activeRadius - 8);
            }
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.fill();
        }
    }
}

const BRAIN_NODES = [
    new BrainNode('core', 'CORE', 0, 0, '#ffffff'),
    new BrainNode('grok', 'Grok', 0, -6, '#f59e0b'),
    new BrainNode('claude', 'Claude', 5, -3, '#8b5cf6'),
    new BrainNode('gpt', 'GPT', 5, 3, '#10a37f'),
    new BrainNode('llama', 'Llama', 0, 6, '#0668e1'),
    new BrainNode('mistral', 'Mistral', -5, 3, '#fd7e14'),
    new BrainNode('gemini', 'Gemini', -5, -3, '#1d4ed8'),
    new BrainNode('cohere', 'Cohere', 0, -10, '#d946ef'),
    new BrainNode('pi', 'Pi', 8, -6, '#14b8a6'),
    new BrainNode('qwen', 'Qwen', 10, 0, '#6366f1'),
    new BrainNode('falcon', 'Falcon', 8, 6, '#eab308'),
    new BrainNode('deepseek', 'DeepSeek', -8, 6, '#ec4899'),
];

export const BackgroundAnimation: React.FC<{ isAmeliorating?: boolean, isLeapMode?: boolean, systemLevel?: number, isDormant?: boolean }> = ({ isAmeliorating = false, isLeapMode = false, systemLevel = 1, isDormant = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isAmelioratingRef = useRef(isAmeliorating);
    const isLeapModeRef = useRef(isLeapMode);
    const systemLevelRef = useRef(systemLevel);
    const isDormantRef = useRef(isDormant);
    const surgeFactorRef = useRef(1.0); 

    useEffect(() => { isAmelioratingRef.current = isAmeliorating; }, [isAmeliorating]);
    useEffect(() => { isLeapModeRef.current = isLeapMode; }, [isLeapMode]);
    useEffect(() => { systemLevelRef.current = systemLevel; }, [systemLevel]);
    useEffect(() => { isDormantRef.current = isDormant; }, [isDormant]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let waves: Shockwave[] = []; 
        let litSegments = new Map<string, { opacity: number }>();
        let animationState: AnimationState = 'AMBIENT';
        let lastStateChangeTime = Date.now();
        let wxzaPoints: {x: number, y: number, isBlurred: boolean}[] = [];
        let nextWaveTime = Date.now() + 500; 

        const drawGrid = () => {
            ctx.strokeStyle = GRID_COLOR;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0.5; x <= canvas.width; x += GRID_SPACING) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
            for (let y = 0.5; y <= canvas.height; y += GRID_SPACING) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
            ctx.stroke();
        };

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Increase particle count based on systemLevel
            const baseCount = window.innerWidth < 768 ? 400 : 800;
            const levelMultiplier = Math.min(4, 1 + (systemLevelRef.current * 0.1));
            const count = isDormantRef.current ? 1 : Math.floor(baseCount * levelMultiplier);
            particles = Array.from({ length: count }, () => new Particle(canvas.width, canvas.height, systemLevelRef.current));
            wxzaPoints = getWxzaPoints(canvas.width, canvas.height);
        };

        window.addEventListener('resize', setup);
        setup();

        let prevIsDormant = isDormantRef.current;

        const loop = () => {
            if (prevIsDormant !== isDormantRef.current) {
                setup();
                prevIsDormant = isDormantRef.current;
            }

            const now = Date.now();
            if (isAmelioratingRef.current || isDormantRef.current) {
                animationState = 'AMBIENT';
            } else {
                const timeInState = now - lastStateChangeTime;
                if (animationState === 'AMBIENT' && timeInState > FORMATION_INTERVAL) {
                    animationState = 'FORMING';
                    lastStateChangeTime = now;
                    particles.forEach((p, i) => {
                        const target = wxzaPoints[i % wxzaPoints.length];
                        p.originX = p.x; p.originY = p.y;
                        p.formationX = target.x; p.formationY = target.y;
                        p.isBlurred = target.isBlurred;
                        p.controlX = p.x + (Math.random() - 0.5) * canvas.width;
                        p.controlY = p.y + (Math.random() - 0.5) * canvas.height;
                    });
                } else if (animationState === 'FORMING' && timeInState > TRANSITION_DURATION) {
                    animationState = 'HOLDING'; lastStateChangeTime = now;
                } else if (animationState === 'HOLDING' && timeInState > HOLD_DURATION) {
                    animationState = 'DISPERSING'; lastStateChangeTime = now;
                    particles.forEach(p => { p.originX = p.x; p.originY = p.y; p.reset(false); });
                } else if (animationState === 'DISPERSING' && timeInState > TRANSITION_DURATION) {
                    animationState = 'AMBIENT'; lastStateChangeTime = now;
                }
            }

            if (animationState === 'AMBIENT' && !isDormantRef.current) {
                if (now > nextWaveTime) {
                    waves.push(new Shockwave(canvas.width, canvas.height, isAmelioratingRef.current, systemLevelRef.current));
                    // Waves happen more frequently at higher levels
                    const levelSpeedup = Math.max(500, 4000 - (systemLevelRef.current * 200));
                    nextWaveTime = now + (isAmelioratingRef.current ? 300 : levelSpeedup) + Math.random() * (levelSpeedup / 2);
                }
            } else { waves = []; }

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add a subtle background glow based on level
            if (systemLevelRef.current >= 8 && !isDormantRef.current) {
                const glowIntensity = Math.min(0.15, systemLevelRef.current * 0.005);
                const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width);
                gradient.addColorStop(0, `rgba(139, 92, 246, ${glowIntensity})`); // Purple glow
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            
            drawGrid();

            // Surge factor increases slightly with level
            const targetSurge = isAmelioratingRef.current ? 4.0 : (1.0 + (systemLevelRef.current * 0.05));
            surgeFactorRef.current += (targetSurge - surgeFactorRef.current) * 0.05;

            litSegments.forEach((val, key) => {
                const [type, c1, c2] = key.split('-');
                const coord1 = parseInt(c1), coord2 = parseInt(c2);
                ctx.strokeStyle = isDormantRef.current ? `rgba(6, 182, 212, ${val.opacity * 0.5})` : `rgba(59, 130, 246, ${val.opacity})`; 
                ctx.beginPath();
                if (type === 'h') { ctx.moveTo(coord2, coord1); ctx.lineTo(coord2 + GRID_SPACING, coord1); }
                else { ctx.moveTo(coord1, coord2); ctx.lineTo(coord1, coord2 + GRID_SPACING); }
                ctx.stroke();
                val.opacity -= 0.02 * surgeFactorRef.current;
                if (val.opacity <= 0) litSegments.delete(key);
            });

            waves.forEach((wave, i) => { wave.update(); wave.draw(ctx); if (wave.opacity <= 0) waves.splice(i, 1); });

            // Draw Brain Nodes
            if (!isDormantRef.current) {
                BRAIN_NODES.forEach(node => {
                    node.updatePosition(canvas.width, canvas.height, animationState);
                    node.draw(ctx, waves, isLeapModeRef.current);
                });
            }

            let progress = (animationState === 'FORMING' || animationState === 'DISPERSING') ? Math.min(1, (now - lastStateChangeTime) / TRANSITION_DURATION) : 0;
            particles.forEach(p => { 
                p.update(animationState, progress, litSegments, surgeFactorRef.current, isAmelioratingRef.current, isDormantRef.current); 
                p.draw(ctx, animationState, surgeFactorRef.current, isAmelioratingRef.current, waves, isDormantRef.current); 
            });

            animationFrameId = requestAnimationFrame(loop);
        };

        loop();
        return () => { window.removeEventListener('resize', setup); cancelAnimationFrame(animationFrameId); };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
