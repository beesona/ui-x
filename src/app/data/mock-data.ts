import { Library } from '../models/library';
import { Project } from '../models/project';

export const LIBRARIES: Library[] = [
  { id: 1, name: '.Net', definition: '.Net Framework', version: '4.6.0' },
  { id: 2, name: '.Net', definition: '.Net Framework', version: '4.6.1' },
  { id: 3, name: '.Net', definition: '.Net Framework', version: '4.6.2' },
  { id: 4, name: '.Net', definition: '.Net Core', version: '1.0' },
  { id: 5, name: '.Net', definition: '.Net Core', version: '1.1' },
  { id: 6, name: '.Net', definition: '.Net Core', version: '1.2' },
  { id: 7, name: '.Net', definition: '.Net Core', version: '2.1' },
  { id: 8, name: '.Net', definition: '.Net Core', version: '2.2' },
  { id: 9, name: 'Java', definition: 'JDK', version: '1.0' },
  { id: 10, name: 'Java', definition: 'JDK', version: '1.1' },
  { id: 11, name: 'Java', definition: 'J2SE', version: '1.2' },
  { id: 12, name: 'Java', definition: 'J2SE', version: '1.3' },
  { id: 13, name: 'Java', definition: 'J2SE', version: '1.4' },
  { id: 14, name: 'Java', definition: 'J2SE', version: '5' },
  { id: 15, name: 'Java', definition: 'SE', version: '6' },
  { id: 16, name: 'Java', definition: 'SE', version: '7' },
  { id: 17, name: 'Java', definition: 'SE', version: '8' },
  { id: 18, name: 'Java', definition: 'SE', version: '9' },
  { id: 19, name: 'Java', definition: 'SE', version: '10' },
  { id: 20, name: 'Java', definition: 'SE', version: '11' }
];

export const PROJECTS: Project[] = [
  { id: 1,
    name: 'Newtonsoft',
    author: 'Microsoft',
    description: 'Popular high-performace JSON library for .NET and .Net Core.',
    version: '1.0',
    createDate: new Date('2011/04/13'),
    icon: 'class-lib',
    libraryIdCollection: [1,2,3,4,5,6,7,8]
  }
];