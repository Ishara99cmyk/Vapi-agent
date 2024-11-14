import React, { useEffect, useRef } from 'react';

const AnimatedCharacter = ({ isSpeaking }) => {
  const animationTimeoutRef = useRef(null);
  const mouthRef = useRef(null);
  const tongueRef = useRef(null);

  const mouthShapes = [
    { height: '30px', tonguePos: '-10px', width: '60px', vowel: 'A' },
    { height: '20px', tonguePos: '-12px', width: '40px', vowel: 'E' },
    { height: '10px', tonguePos: '-14px', width: '35px', vowel: 'I' },
    { height: '25px', tonguePos: '-11px', width: '50px', vowel: 'O' },
    { height: '18px', tonguePos: '-13px', width: '45px', vowel: 'U' },
    { height: '28px', tonguePos: '-10px', width: '55px', vowel: 'AH' },
    { height: '15px', tonguePos: '-13px', width: '50px', vowel: 'EE' },
    { height: '22px', tonguePos: '-11px', width: '60px', vowel: 'OO' }
  ];

  const animateMouth = () => {
    if (!mouthRef.current || !tongueRef.current) return;

    const shape = mouthShapes[Math.floor(Math.random() * mouthShapes.length)];
    mouthRef.current.style.height = shape.height;
    mouthRef.current.style.width = shape.width;
    tongueRef.current.style.bottom = shape.tonguePos;

    animationTimeoutRef.current = setTimeout(animateMouth, Math.random() * 100 + 50);
  };

  const stopAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (mouthRef.current && tongueRef.current) {
      mouthRef.current.style.height = '5px';
      tongueRef.current.style.bottom = '-15px';
    }
  };

  useEffect(() => {
    if (isSpeaking) {
      animateMouth();
    } else {
      stopAnimation();
    }
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, );

  return (
    <div className={`cartoon ${isSpeaking ? 'talking' : ''}`}>
      <div className="shoulders"></div>
      <div className="hair-back"></div>
      <div className="neck"></div>
      <div className="ear"></div>
      <div className="ear"></div>
      <div className="face">
        <div className="cheek"></div>
        <div className="nose"></div>
        <div className="mouth-container">
          <div className="mouth" ref={mouthRef}>
            <div className="mouth-cavity"></div>
            <div className="tongue" ref={tongueRef}></div>
            <div className="upper-lip"></div>
          </div>
        </div>
        <div className="eye">
          <div className="pupil"></div>
          <div className="eye-bright"></div>
        </div>
        <div className="eye">
          <div className="pupil"></div>
          <div className="eye-bright"></div>
        </div>
        <div className="eyebrow"></div>
        <div className="eyebrow"></div>
      </div>
      <div className="forehead"></div>
      <div className="hair-front-1"></div>
      <div className="hair-front-1"></div>
      <div className="hair-front-2"></div>
      <div className="hair-front-2"></div>
      <div className="hair-front-3"></div>
      <div className="hair-front-3"></div>
      <div className="hair-bangs"></div>
      <div className="shirt-neck"></div>
      <div className="shirt-neck"></div>
    </div>
  );
};

export default AnimatedCharacter;