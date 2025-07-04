import React, { useEffect, useState } from 'react';
import { X, Download, ExternalLink, Github, Linkedin, Mail, Phone, Calendar, Star, Zap, Trophy, ChevronRight, Code, Briefcase, GraduationCap, Award, BookOpen, Gamepad2 } from 'lucide-react';

const Modal = ({ isOpen, onClose, content, portfolioData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShowContent(false);
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const renderContent = () => {
    if (!content) return null;

    switch (content.type) {
      case 'about':
        return <AboutContent data={portfolioData.about} />;
      
      case 'skills':
        return <SkillsContent data={portfolioData.skills} />;
      
      case 'tools':
        return <ToolsContent data={content.data.tools} />;
      
      case 'timeline':
        return <TimelineContent data={portfolioData.experience} />;
      
      case 'achievements':
        return <AchievementsContent data={content.data.achievements} />;
      
      case 'project':
        return <ProjectContent project={portfolioData.projects.find(p => p.id === content.data.projectId)} />;
      
      case 'education':
        return <EducationContent data={portfolioData.education} />;
      
      case 'certifications':
        return <CertificationsContent data={content.data.certs} />;
      
      case 'contact':
        return <ContactContent data={portfolioData.contact} />;
      
      case 'easter-egg':
        return <EasterEggContent />;
      
      case 'terminal':
        return <TerminalContent commands={content.data.commands} />;
      
      case 'download':
        handleDownload(content.data);
        onClose();
        return null;
      
      default:
        return <div>Content not found</div>;
    }
  };

  const handleDownload = (data) => {
    const link = document.createElement('a');
    link.href = data.file;
    link.download = data.filename;
    link.click();
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${showContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      
      <div className={`relative bg-gray-900 rounded-xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-gray-700 ${showContent ? 'scale-100' : 'scale-95'} transition-transform duration-300`}>
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {content?.type && content.type.charAt(0).toUpperCase() + content.type.slice(1)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Content Components
const AboutContent = ({ data }) => (
  <div className="space-y-6">
    <div className="text-center">
      <div className="text-6xl mb-4">{data.avatar}</div>
      <h1 className="text-3xl font-bold text-blue-400">{data.name}</h1>
      <p className="text-xl text-gray-400">{data.title}</p>
    </div>
    
    <p className="text-gray-300 leading-relaxed text-lg">{data.bio}</p>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="text-3xl mb-2">🚀</div>
        <h3 className="font-bold text-white">5+ Years</h3>
        <p className="text-gray-400">Experience</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <div className="text-3xl mb-2">📱</div>
        <h3 className="font-bold text-white">20+ Apps</h3>
        <p className="text-gray-400">Deployed</p>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-2">
      {['Kotlin Expert', 'UI/UX Enthusiast', 'Performance Optimizer', 'Team Player'].map((tag, i) => (
        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const SkillsContent = ({ data }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-purple-400 mb-4">Technical Skills</h2>
    <div className="grid gap-4">
      {data.map((skill, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 flex items-center gap-2">
              <span className="text-2xl">{skill.icon}</span>
              <span className="font-medium">{skill.name}</span>
            </span>
            <span className="text-gray-400">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 skill-bar"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ToolsContent = ({ data }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-purple-400 mb-4">Development Tools</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((tool, i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
          <div className="text-3xl mb-2">{tool.icon}</div>
          <h3 className="font-semibold text-white">{tool.name}</h3>
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, j) => (
              <div
                key={j}
                className={`w-2 h-2 rounded-full ${
                  j < Math.floor(tool.proficiency / 20) ? 'bg-purple-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TimelineContent = ({ data }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-amber-400 mb-4">Career Timeline</h2>
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-amber-500/30" />
      
      {data.map((job, i) => (
        <div key={i} className="relative flex gap-4 mb-8">
          {/* Timeline dot */}
          <div className="absolute left-8 w-4 h-4 bg-amber-500 rounded-full -translate-x-1/2 mt-1.5 z-10" />
          
          <div className="ml-16 flex-1">
            <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                  <p className="text-amber-400">{job.company}</p>
                </div>
                <span className="text-gray-400 text-sm">{job.period}</span>
              </div>
              <p className="text-gray-300 mb-3">{job.description}</p>
              <div className="space-y-1">
                {job.achievements.map((achievement, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm text-gray-400">
                    <ChevronRight className="w-3 h-3" />
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AchievementsContent = ({ data }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-amber-400 mb-4">Achievements</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((achievement, i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
          <div className="text-4xl mb-3">{achievement.icon}</div>
          <h3 className="text-xl font-semibold text-white mb-2">{achievement.title}</h3>
          <p className="text-gray-400">{achievement.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const ProjectContent = ({ project }) => {
  if (!project) return <div>Project not found</div>;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{project.icon}</span>
        <h2 className="text-3xl font-bold text-green-400">{project.name}</h2>
      </div>
      
      <p className="text-gray-300 text-lg">{project.description}</p>
      
      <div>
        <h3 className="text-xl font-semibold text-white mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {project.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-300">
              <Star className="w-4 h-4 text-green-400" />
              {feature}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 pt-4">
        <a
          href={project.playStore}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Play Store
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <Github className="w-4 h-4" />
          Source Code
        </a>
      </div>
    </div>
  );
};

const EducationContent = ({ data }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-pink-400 mb-4">Education</h2>
    {data.map((edu, i) => (
      <div key={i} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
        <div className="flex items-start gap-4">
          <div className="text-3xl">
            <GraduationCap className="w-8 h-8 text-pink-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
            <p className="text-pink-400">{edu.school}</p>
            <div className="flex justify-between items-center mt-2 text-gray-400">
              <span>{edu.year}</span>
              <span>{edu.gpa}</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CertificationsContent = ({ data }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-pink-400 mb-4">Certifications</h2>
    <div className="grid gap-4">
      {data.map((cert, i) => (
        <div key={i} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-pink-400" />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{cert.name}</h3>
              <p className="text-gray-400">{cert.issuer} • {cert.year}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactContent = ({ data }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-cyan-400 mb-4">Get In Touch</h2>
    <p className="text-gray-300 text-lg">I'm always open to discussing new opportunities and interesting projects!</p>
    
    <div className="grid gap-4">
      <a
        href={`mailto:${data.email}`}
        className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <Mail className="w-6 h-6 text-cyan-400" />
        <span className="text-white">{data.email}</span>
      </a>
      
      <a
        href={data.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <Linkedin className="w-6 h-6 text-cyan-400" />
        <span className="text-white">LinkedIn Profile</span>
        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
      </a>
      
      <a
        href={data.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <Github className="w-6 h-6 text-cyan-400" />
        <span className="text-white">GitHub Profile</span>
        <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
      </a>
    </div>
    
    <div className="bg-cyan-500/10 rounded-lg p-4 text-center">
      <p className="text-cyan-400">💡 Response time: Usually within 24 hours</p>
    </div>
  </div>
);

const EasterEggContent = () => (
  <div className="space-y-6 text-center">
    <div className="text-6xl mb-4">🎮</div>
    <h2 className="text-3xl font-bold text-purple-400">Congratulations, Explorer!</h2>
    <p className="text-gray-300 text-lg">You've discovered the secret cave! Here are some fun facts about me:</p>
    
    <div className="grid gap-4 text-left max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-2">🎮 Gaming Enthusiast</h3>
        <p className="text-gray-400">I love indie games and game development. This portfolio is inspired by my passion for interactive experiences!</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-2">🎨 Creative Coder</h3>
        <p className="text-gray-400">I believe code is art. I enjoy creating unique user experiences that blend functionality with creativity.</p>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-2">🚀 Side Projects</h3>
        <p className="text-gray-400">Beyond Android, I experiment with web technologies, game engines, and creative coding frameworks.</p>
      </div>
    </div>
    
    <div className="pt-4">
      <p className="text-purple-400 font-mono text-sm animate-pulse">
        // Achievement Unlocked: Curious Explorer! 🏆
      </p>
    </div>
  </div>
);

const TerminalContent = ({ commands }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedCommands, setDisplayedCommands] = useState([]);

  useEffect(() => {
    if (currentLine < commands.length) {
      const timer = setTimeout(() => {
        setDisplayedCommands(prev => [...prev, commands[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, commands[currentLine].delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentLine, commands]);

  return (
    <div className="bg-black rounded-lg p-4 font-mono text-green-400">
      <div className="mb-2 text-gray-500">guest@portfolio:~$</div>
      <div className="space-y-1">
        {displayedCommands.map((cmd, i) => (
          <div key={i} className="typing-animation">
            {cmd.text}
          </div>
        ))}
        {currentLine < commands.length && (
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default Modal;