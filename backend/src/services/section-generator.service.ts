import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

interface SectionTemplate {
  name: string;
  description: string;
  type: string;
  variation?: string;
}

interface WebsiteTypeConfig {
  keywords: string[];
  heroOptions: SectionTemplate[];
  aboutOptions: SectionTemplate[];
  contactOptions: SectionTemplate[];
}

@Injectable()
export class SectionGeneratorService {
  private readonly websiteTypes: Record<string, WebsiteTypeConfig> = {
    'restaurant': {
      keywords: ['restaurant', 'food', 'dining', 'cafe', 'bistro', 'eatery', 'culinary', 'kitchen'],
      heroOptions: [
        { name: 'Welcome to Our Table', description: 'Warm invitation showcasing signature dishes, chef expertise, and dining atmosphere that makes guests feel at home', type: 'hero', variation: 'welcoming' },
        { name: 'Culinary Excellence', description: 'Bold statement of culinary mastery featuring award-winning dishes, premium ingredients, and exceptional dining experience', type: 'hero', variation: 'premium' },
        { name: 'Taste the Tradition', description: 'Heritage-focused introduction highlighting family recipes, traditional cooking methods, and authentic flavors passed down generations', type: 'hero', variation: 'traditional' },
        { name: 'Fresh. Local. Delicious.', description: 'Farm-to-table emphasis showcasing locally sourced ingredients, seasonal menus, and commitment to sustainability', type: 'hero', variation: 'fresh' },
        { name: 'Your Neighborhood Favorite', description: 'Community-centered welcome emphasizing local connection, regular customer appreciation, and cozy neighborhood atmosphere', type: 'hero', variation: 'community' }
      ],
      aboutOptions: [
        { name: 'Our Culinary Journey', description: 'Inspiring story of the restaurant\'s founding, chef\'s passion, and evolution of flavors that defines our unique identity', type: 'about', variation: 'journey' },
        { name: 'Meet the Chef', description: 'Personal introduction to head chef including culinary background, philosophy, and what drives their creative approach to cooking', type: 'about', variation: 'personal' },
        { name: 'Family Heritage', description: 'Multi-generational story showcasing family traditions, handed-down recipes, and cultural heritage that influences every dish', type: 'about', variation: 'heritage' },
        { name: 'Farm to Fork Philosophy', description: 'Deep dive into sourcing practices, relationships with local farmers, and commitment to fresh, sustainable ingredients', type: 'about', variation: 'sustainability' },
        { name: 'Community Kitchen', description: 'Story of how the restaurant serves as community gathering place, supporting local causes and bringing people together', type: 'about', variation: 'community' }
      ],
      contactOptions: [
        { name: 'Reserve Your Table', description: 'Easy reservation system with real-time availability, special occasion booking, and instant confirmation for seamless dining', type: 'contact', variation: 'booking' },
        { name: 'Find Us & Connect', description: 'Complete location details, parking information, public transport access, and multiple contact methods for easy reach', type: 'contact', variation: 'location' },
        { name: 'Plan Your Event', description: 'Private dining options, catering services, special event coordination, and group booking with customized menu planning', type: 'contact', variation: 'events' },
        { name: 'Get in Touch', description: 'Multiple communication channels including phone, email, social media, and feedback forms for inquiries and suggestions', type: 'contact', variation: 'communication' }
      ]
    },
    'portfolio': {
      keywords: ['portfolio', 'designer', 'developer', 'freelancer', 'creative', 'artist', 'photographer', 'writer'],
      heroOptions: [
        { name: 'Creative Problem Solver', description: 'Bold introduction showcasing innovative approach to design challenges, unique creative process, and transformative project outcomes', type: 'hero', variation: 'innovative' },
        { name: 'Bringing Ideas to Life', description: 'Inspiring message about turning concepts into reality through expert design skills, technical expertise, and creative vision', type: 'hero', variation: 'visionary' },
        { name: 'Design with Purpose', description: 'Mission-driven introduction emphasizing meaningful design that solves real problems and creates positive user experiences', type: 'hero', variation: 'purposeful' },
        { name: 'Craft & Excellence', description: 'Artisan approach highlighting meticulous attention to detail, quality craftsmanship, and commitment to design excellence', type: 'hero', variation: 'crafted' },
        { name: 'Your Creative Partner', description: 'Collaborative approach emphasizing partnership, understanding client needs, and working together to achieve design goals', type: 'hero', variation: 'collaborative' }
      ],
      aboutOptions: [
        { name: 'My Design Story', description: 'Personal journey from creative beginnings to professional expertise, highlighting key milestones and design philosophy evolution', type: 'about', variation: 'personal' },
        { name: 'Skills & Expertise', description: 'Comprehensive overview of technical abilities, creative skills, and specialized knowledge across various design disciplines', type: 'about', variation: 'professional' },
        { name: 'Creative Philosophy', description: 'Deep exploration of design principles, creative process, and beliefs about what makes truly effective and beautiful design', type: 'about', variation: 'philosophy' },
        { name: 'Experience & Growth', description: 'Professional timeline showcasing career progression, major projects, and continuous learning in evolving design landscape', type: 'about', variation: 'experience' },
        { name: 'Passion for Innovation', description: 'Enthusiasm for emerging design trends, new technologies, and pushing creative boundaries in every project undertaken', type: 'about', variation: 'innovation' }
      ],
      contactOptions: [
        { name: 'Start Your Project', description: 'Streamlined project initiation process with consultation booking, project scope discussion, and clear next steps for collaboration', type: 'contact', variation: 'project' },
        { name: 'Let\'s Create Together', description: 'Collaborative invitation with multiple contact methods, response time expectations, and partnership approach to new projects', type: 'contact', variation: 'collaborative' },
        { name: 'Available for Freelance', description: 'Availability status, preferred project types, timeline expectations, and professional hiring process for freelance opportunities', type: 'contact', variation: 'freelance' },
        { name: 'Connect & Discuss', description: 'Open communication channels for ideas, questions, potential collaborations, and professional networking opportunities', type: 'contact', variation: 'networking' }
      ]
    },
    'business': {
      keywords: ['business', 'company', 'corporate', 'services', 'consulting', 'agency', 'firm', 'enterprise'],
      heroOptions: [
        { name: 'Excellence in Service', description: 'Professional introduction highlighting industry leadership, proven track record, and commitment to delivering exceptional client results', type: 'hero', variation: 'excellence' },
        { name: 'Your Success Partner', description: 'Partnership-focused message emphasizing collaborative approach, client success stories, and shared growth objectives', type: 'hero', variation: 'partnership' },
        { name: 'Innovation Driven', description: 'Forward-thinking introduction showcasing cutting-edge solutions, industry innovation, and technology-driven service delivery', type: 'hero', variation: 'innovation' },
        { name: 'Trusted Expertise', description: 'Authority-building message highlighting years of experience, industry certifications, and client trust built through consistent delivery', type: 'hero', variation: 'trusted' },
        { name: 'Results That Matter', description: 'Outcome-focused introduction emphasizing measurable results, ROI delivery, and tangible business impact for clients', type: 'hero', variation: 'results' }
      ],
      aboutOptions: [
        { name: 'Our Company Story', description: 'Comprehensive company history from founding vision to current market position, highlighting growth milestones and evolution', type: 'about', variation: 'company' },
        { name: 'Team & Expertise', description: 'Introduction to key team members, collective experience, specialized skills, and collaborative approach to client service', type: 'about', variation: 'team' },
        { name: 'Mission & Values', description: 'Core business philosophy, ethical standards, company values, and commitment to client success and industry excellence', type: 'about', variation: 'values' },
        { name: 'Industry Leadership', description: 'Market position, industry recognition, thought leadership, and innovative approaches that set the company apart', type: 'about', variation: 'leadership' },
        { name: 'Client-Centered Approach', description: 'Philosophy of putting clients first, understanding unique needs, and delivering customized solutions for every business', type: 'about', variation: 'client-focused' }
      ],
      contactOptions: [
        { name: 'Schedule Consultation', description: 'Professional consultation booking with needs assessment, strategy discussion, and proposal development for potential partnerships', type: 'contact', variation: 'consultation' },
        { name: 'Get in Touch', description: 'Multiple professional contact channels including direct lines, email, office locations, and response time commitments', type: 'contact', variation: 'professional' },
        { name: 'Request Proposal', description: 'Structured proposal request process with project scope definition, timeline discussion, and detailed service quotations', type: 'contact', variation: 'proposal' },
        { name: 'Start Partnership', description: 'Partnership initiation process with discovery sessions, goal alignment, and strategic planning for successful collaboration', type: 'contact', variation: 'partnership' }
      ]
    },
    'ecommerce': {
      keywords: ['shop', 'store', 'ecommerce', 'online', 'marketplace', 'retail', 'products', 'shopping'],
      heroOptions: [
        { name: 'Shop Premium Quality', description: 'Curated selection introduction highlighting product quality, brand authenticity, and exclusive items with exceptional shopping experience', type: 'hero', variation: 'premium' },
        { name: 'Discover Amazing Deals', description: 'Value-focused welcome showcasing competitive prices, special offers, seasonal sales, and unbeatable value propositions', type: 'hero', variation: 'value' },
        { name: 'Latest Trends & Styles', description: 'Fashion-forward introduction featuring newest arrivals, trending products, style inspiration, and contemporary design collections', type: 'hero', variation: 'trendy' },
        { name: 'Your Shopping Destination', description: 'Comprehensive marketplace introduction emphasizing product variety, easy navigation, and one-stop shopping convenience', type: 'hero', variation: 'convenience' },
        { name: 'Trusted Online Store', description: 'Reliability-focused message highlighting secure shopping, customer satisfaction, trusted reviews, and established reputation', type: 'hero', variation: 'trusted' }
      ],
      aboutOptions: [
        { name: 'Our Brand Story', description: 'Company founding story, brand mission, product curation philosophy, and commitment to customer satisfaction and quality', type: 'about', variation: 'brand' },
        { name: 'Quality Promise', description: 'Detailed quality assurance process, product sourcing standards, authenticity guarantees, and customer satisfaction commitments', type: 'about', variation: 'quality' },
        { name: 'Customer First', description: 'Customer service philosophy, support team expertise, satisfaction guarantees, and commitment to exceptional shopping experience', type: 'about', variation: 'customer' },
        { name: 'Sustainable Shopping', description: 'Environmental responsibility, ethical sourcing practices, sustainable packaging, and commitment to responsible retail operations', type: 'about', variation: 'sustainable' },
        { name: 'Innovation in Retail', description: 'Technology-driven shopping experience, innovative features, user-friendly interface, and cutting-edge e-commerce solutions', type: 'about', variation: 'innovation' }
      ],
      contactOptions: [
        { name: 'Customer Support', description: 'Comprehensive customer service with live chat, email support, phone assistance, and detailed FAQ for shopping assistance', type: 'contact', variation: 'support' },
        { name: 'Order & Shipping', description: 'Order tracking, shipping information, delivery options, international shipping, and logistics support for customer convenience', type: 'contact', variation: 'logistics' },
        { name: 'Returns & Exchanges', description: 'Hassle-free return policy, exchange process, refund procedures, and customer satisfaction guarantee details', type: 'contact', variation: 'returns' },
        { name: 'Connect with Us', description: 'Social media presence, newsletter signup, customer feedback channels, and community engagement opportunities', type: 'contact', variation: 'community' }
      ]
    },
    'default': {
      keywords: [],
      heroOptions: [
        { name: 'Welcome & Discover', description: 'Engaging introduction that captures visitor attention with compelling messaging and clear value proposition presentation', type: 'hero', variation: 'welcoming' },
        { name: 'Your Digital Destination', description: 'Professional welcome emphasizing unique offerings, user benefits, and reasons to explore further content', type: 'hero', variation: 'destination' },
        { name: 'Innovation & Excellence', description: 'Quality-focused introduction highlighting exceptional standards, innovative approaches, and commitment to user satisfaction', type: 'hero', variation: 'excellence' },
        { name: 'Connect & Engage', description: 'Community-oriented welcome inviting interaction, participation, and meaningful connection with the platform or service', type: 'hero', variation: 'engaging' },
        { name: 'Explore Possibilities', description: 'Opportunity-focused introduction encouraging discovery, exploration, and engagement with available features and content', type: 'hero', variation: 'exploratory' }
      ],
      aboutOptions: [
        { name: 'Our Story', description: 'Comprehensive background information including founding principles, development journey, and core mission statement', type: 'about', variation: 'story' },
        { name: 'Mission & Vision', description: 'Clear articulation of organizational purpose, future goals, values, and commitment to user success and satisfaction', type: 'about', variation: 'mission' },
        { name: 'What We Offer', description: 'Detailed overview of services, features, benefits, and unique value propositions available to users and visitors', type: 'about', variation: 'offerings' },
        { name: 'Our Approach', description: 'Methodology explanation, working principles, quality standards, and philosophical approach to service delivery', type: 'about', variation: 'approach' },
        { name: 'Why Choose Us', description: 'Competitive advantages, unique selling points, success stories, and compelling reasons for user engagement', type: 'about', variation: 'advantages' }
      ],
      contactOptions: [
        { name: 'Get in Touch', description: 'Multiple contact methods including email, phone, contact forms, and social media for easy communication access', type: 'contact', variation: 'communication' },
        { name: 'Connect & Follow', description: 'Social media presence, newsletter signup, community engagement, and ongoing relationship building opportunities', type: 'contact', variation: 'social' },
        { name: 'Support & Help', description: 'Customer support options, help documentation, FAQ resources, and assistance channels for user questions', type: 'contact', variation: 'support' },
        { name: 'Location & Hours', description: 'Physical location details, operating hours, directions, parking information, and accessibility features', type: 'contact', variation: 'location' }
      ]
    }
  };

  private detectWebsiteType(prompt: string): string {
    const normalizedPrompt = prompt.toLowerCase();
    
    // Check each website type for keyword matches
    for (const [type, config] of Object.entries(this.websiteTypes)) {
      if (type === 'default') continue;
      
      const hasMatch = config.keywords.some(keyword => 
        normalizedPrompt.includes(keyword)
      );
      
      if (hasMatch) {
        return type;
      }
    }
    
    return 'default';
  }

  private getRandomOption(options: SectionTemplate[]): SectionTemplate {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  private customizeDescription(template: SectionTemplate, prompt: string): string {
    const normalizedPrompt = prompt.toLowerCase();
    let customDescription = template.description;
    
    // Add context-specific customizations based on prompt keywords
    if (normalizedPrompt.includes('modern') || normalizedPrompt.includes('contemporary')) {
      customDescription = customDescription.replace('traditional', 'modern').replace('classic', 'contemporary');
    }
    
    if (normalizedPrompt.includes('luxury') || normalizedPrompt.includes('premium')) {
      customDescription = customDescription.replace('quality', 'premium quality').replace('service', 'luxury service');
    }
    
    if (normalizedPrompt.includes('local') || normalizedPrompt.includes('community')) {
      customDescription = customDescription.replace('customers', 'local community').replace('clients', 'local clients');
    }
    
    if (normalizedPrompt.includes('eco') || normalizedPrompt.includes('sustainable') || normalizedPrompt.includes('green')) {
      customDescription = customDescription.replace('practices', 'sustainable practices').replace('approach', 'eco-friendly approach');
    }
    
    return customDescription;
  }

  generateSections(prompt: string): { id: string; name: string; description: string; type: string }[] {
    const websiteType = this.detectWebsiteType(prompt);
    const config = this.websiteTypes[websiteType];
    
    // Randomly select one option from each category
    const selectedHero = this.getRandomOption(config.heroOptions);
    const selectedAbout = this.getRandomOption(config.aboutOptions);
    const selectedContact = this.getRandomOption(config.contactOptions);
    
    const sections = [selectedHero, selectedAbout, selectedContact];
    
    return sections.map(template => ({
      id: uuidv4(),
      name: template.name,
      description: this.customizeDescription(template, prompt),
      type: template.type
    }));
  }
}
