-- ==============================================================================
-- Seed Data: Initial Portfolio & CMS Data
-- ==============================================================================

-- 1. SEED PROFILE
INSERT INTO public.profiles (
    id,
    name,
    title,
    short_description,
    long_description,
    photo_url,
    email,
    linkedin_url,
    github_url,
    instagram_url,
    twitter_url
) VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Reynold Andre',
    'Web Developer',
    'A Web Developer and Software Engineering Technology graduate from IPB University, with experience in web application development, a strong interest in Data Engineering, and expertise in ETL concepts, always seeking opportunities to enhance technical skills and contribute to innovative solutions.',
    'A Web Developer and Software Engineering Technology graduate from IPB University, with experience in web application development, a strong interest in Data Engineering, and expertise in ETL concepts. Always passionate about creating performant, beautiful, and secure software applications.',
    '/image/andre.jpg',
    'reynold.dre@gmail.com',
    'https://www.linkedin.com/in/reynoldandre/',
    'https://github.com/rey-andre',
    'https://www.instagram.com/reynold.sgn/',
    'https://twitter.com/rynld_ndr'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    photo_url = EXCLUDED.photo_url,
    email = EXCLUDED.email,
    linkedin_url = EXCLUDED.linkedin_url,
    github_url = EXCLUDED.github_url,
    instagram_url = EXCLUDED.instagram_url,
    twitter_url = EXCLUDED.twitter_url,
    updated_at = now();

-- 2. SEED EDUCATION
INSERT INTO public.education (
    id,
    institution,
    degree,
    field_of_study,
    start_year,
    end_year,
    description,
    logo_url,
    display_order,
    is_visible
) VALUES (
    '00000000-0000-0000-0000-000000000010',
    'IPB University',
    'Sarjana Terapan (S.Tr.Kom)',
    'Teknologi Rekayasa Perangkat Lunak',
    '2020',
    '2024',
    'Graduated with GPA 3.80. Focused on Software Engineering, Web Development, and Data Engineering concepts.',
    NULL,
    1,
    true
) ON CONFLICT (id) DO NOTHING;

-- 3. SEED PROJECTS
-- Project 1: Card Profile
INSERT INTO public.projects (
    id,
    title,
    slug,
    short_description,
    description,
    technologies,
    project_type,
    project_url,
    repository_url,
    thumbnail_url,
    display_order,
    is_published
) VALUES (
    '00000000-0000-0000-0000-000000000101',
    'Card Profile',
    'card-profile',
    'Card Profile is a component that displays user profile information in card form with interactive network animations.',
    'Card Profile is a component that displays user profile information in card form. This card can be used to display photos, names, and user contact information. This card can also be used to display additional information such as address, telephone number, and user social media.',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Canvas'],
    'Web App',
    'https://rey-andre.github.io',
    'https://github.com/rey-andre/rey-andre.github.io',
    '/image/andre.jpg',
    1,
    true
) ON CONFLICT (id) DO NOTHING;

-- Project 2: Employee Self Service Web App
INSERT INTO public.projects (
    id,
    title,
    slug,
    short_description,
    description,
    technologies,
    project_type,
    project_url,
    repository_url,
    thumbnail_url,
    display_order,
    is_published
) VALUES (
    '00000000-0000-0000-0000-000000000102',
    'Employee Self Service Web App',
    'employee-self-service-web',
    'A comprehensive web application that allows employees to access personal information, payroll, leave requests, and company documents.',
    'Employee Self Service Web App is a web application that allows employees to access their personal information, such as salaries, leave, and benefits. This application also allows employees to apply for leave, change personal information, and access important documents. This application is designed to improve employee efficiency and productivity.',
    ARRAY['Laravel', 'PHP', 'PostgreSQL', 'JavaScript', 'Bootstrap'],
    'Web App',
    NULL,
    NULL,
    NULL,
    2,
    true
) ON CONFLICT (id) DO NOTHING;

-- Project 3: Employee Self Service Mobile App
INSERT INTO public.projects (
    id,
    title,
    slug,
    short_description,
    description,
    technologies,
    project_type,
    project_url,
    repository_url,
    thumbnail_url,
    display_order,
    is_published
) VALUES (
    '00000000-0000-0000-0000-000000000103',
    'Employee Self Service Mobile App',
    'employee-self-service-mobile',
    'Mobile companion application allowing employees to conveniently access services, submit leave, and view announcements anywhere.',
    'Employee Self Service Mobile App is a mobile application that allows employees to access their personal information, such as salaries, leave, and benefits. This application also allows employees to apply for leave, change personal information, and access important documents. This application is designed to improve employee efficiency and productivity.',
    ARRAY['Flutter', 'Dart', 'REST API', 'PostgreSQL'],
    'Mobile App',
    NULL,
    NULL,
    NULL,
    3,
    true
) ON CONFLICT (id) DO NOTHING;

-- Project 4: AML-CFT Web App
INSERT INTO public.projects (
    id,
    title,
    slug,
    short_description,
    description,
    technologies,
    project_type,
    project_url,
    repository_url,
    thumbnail_url,
    display_order,
    is_published
) VALUES (
    '00000000-0000-0000-0000-000000000104',
    'Anti Money Laundering and Countering the Financing of Terrorism (AML-CFT) Web App',
    'aml-cft-web-app',
    'Enterprise banking application to detect and report large or suspicious transactions to prevent financial crimes.',
    'AML-CFT is an application used by banks to report all large or suspicious transactions in order to prevent money laundering and distribution of terrorist/crime funds.',
    ARRAY['Laravel', 'PHP', 'PostgreSQL', 'ETL', 'Tailwind CSS'],
    'Web App',
    NULL,
    NULL,
    NULL,
    4,
    true
) ON CONFLICT (id) DO NOTHING;

-- 4. SEED EXPERIENCES
INSERT INTO public.experiences (
    id,
    company,
    role,
    employment_type,
    location,
    start_date,
    end_date,
    description,
    responsibilities,
    technologies,
    display_order,
    is_visible
) VALUES
(
    '00000000-0000-0000-0000-000000000201',
    'PT Mobil Anak Bangsa',
    'Programmer / Software Engineer',
    'Full-time',
    'Jakarta, Indonesia',
    'Dec 2025',
    'Present',
    'Leading end-to-end development of internal enterprise systems and managing cloud server infrastructure.',
    ARRAY[
        'End-to-End System Development: Spearheaded the end-to-end development of PRO-MIS (Portal Management Internal System) as a solo developer, driving the full software lifecycle from system design and architecture to coding and deployment.',
        'AI-Assisted Engineering: Leveraged AI agents (Google Antigravity IDE) to accelerate development workflows, optimize code quality, and efficiently architect complex internal systems.',
        'Cloud Infrastructure Management: Administered and managed the company''s cloud server infrastructure to ensure optimal performance, security, and high availability for internal web applications.',
        'Financial & Budget Systems: Engineered an Accounting module to consolidate financial reports across MABI Group subsidiaries by bridging multiple disparate Accurate databases. Developed a Finance & Budget Control module to track annual departmental budgets and monitor cost realization linked to Purchase Requests (PR).',
        'Operational Tracking Solutions: Built an After-Sales Service module for comprehensive unit reporting, enabling real-time recording, tracking, and monitoring of unit damages, adjustments, and maintenance requests.'
    ],
    ARRAY['PHP', 'Laravel', 'PostgreSQL', 'Windows Server', 'Cloud Infrastructure', 'Google Antigravity IDE', 'Accurate DB'],
    1,
    true
),
(
    '00000000-0000-0000-0000-000000000202',
    'PT Asta Protek Jiarsi',
    'Programmer',
    'Contract',
    'Tangerang, Indonesia',
    'Jan 2024',
    'Nov 2025',
    'Development and maintenance of banking compliance and data integration applications.',
    ARRAY[
        'Developed and maintained Anti Money Laundering (AML) applications using Laravel & PostgreSQL.',
        'Rewrote AML applications from Laravel using Vue.js & Node.js for enhanced modern architecture.',
        'Implemented ETL processes using Pentaho Data Integration for data transfer across enterprise systems.',
        'Improved system performance and stability through bug fixing and database query optimization.',
        'Created technical documentation for ETL pipelines and data transformation workflows.'
    ],
    ARRAY['Laravel', 'PostgreSQL', 'Vue.js', 'Node.js', 'Pentaho Data Integration', 'ETL'],
    2,
    true
),
(
    '00000000-0000-0000-0000-000000000203',
    'PT Asta Protek Jiarsi',
    'PHP Programmer',
    'Internship',
    'Tangerang, Indonesia',
    'Aug 2023',
    'Dec 2023',
    'Development of banking reporting and self-service internal applications.',
    ARRAY[
        'Developed Central Bank Reporting (CBR) web applications using Laravel.',
        'Developed Employee Self Service (ESS) systems for web (Laravel) and mobile (Flutter).',
        'Analyzed and resolved bugs while ensuring system stability and high code quality.',
        'Created comprehensive documentation for database queries and user operational guides.'
    ],
    ARRAY['PHP', 'Laravel', 'Flutter', 'MySQL', 'REST API'],
    3,
    true
)
ON CONFLICT (id) DO NOTHING;

