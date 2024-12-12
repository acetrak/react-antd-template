import {Subject} from 'rxjs'

export const themeBus = new Subject<'defaultAlgorithm'|'darkAlgorithm'|'toggle'>()
