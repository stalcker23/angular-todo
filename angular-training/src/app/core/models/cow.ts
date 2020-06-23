export class Cow {
    public cowId: number;
    public animalId: number;
    public eventId: number;
    public healthIndex?: number;
    public endDate?: number;
    public endDateTime?: number;
    public minValueDateTime?: number;
    public type?: string;
    public deletable: boolean;
    public lactationNumber: number;
    public oldLactationNumber?: number;
    public daysInLactation: number;
    public ageInDays: number;
    public originalStartDateTime?: number;
    public startDateTime: number;
    public reportingDateTime: number;
    public alert?: string;
    public duration?: number;
    public daysInPregnancy?: number;
    public heatIndexPeak?: string;
    public newGroupId?: number;
    public newGroupName?: string;
    public currentGroupId?: number;
    public currentGroupName?: string;
    public destinationGroupName?: string;
    public destinationGroup?: number;
    public calvingEase?: string;
    public newborns?: string;
    public cowEntryStatus?: string;
    public birthDateCalculated?: boolean;
    public sire?: string;
    public breedingNumber?: number;
    public isOutOfBreedingWindow?: boolean;
    public interval: number;

    constructor() {}

    public static createInstance(initializer: any): Cow {
        const instance = new Cow();

        instance.cowId = initializer.cowId;
        instance.animalId = initializer.animalId;
        instance.eventId = initializer.eventId;
        instance.healthIndex = initializer.healthIndex || null;
        instance.endDate = initializer.endDate || null;
        instance.endDateTime = initializer.endDateTime || null;
        instance.minValueDateTime = initializer.minValueDateTime || null;
        instance.type = initializer.type || null;
        instance.deletable = initializer.deletable;
        instance.lactationNumber = initializer.lactationNumber;
        instance.oldLactationNumber = initializer.oldLactationNumber || null;
        instance.daysInLactation = initializer.daysInLactation;
        instance.ageInDays = initializer.ageInDays;
        instance.originalStartDateTime = initializer.originalStartDateTime || null;
        instance.startDateTime = initializer.startDateTime;
        instance.reportingDateTime = initializer.reportingDateTime;
        instance.alert = initializer.alert || null;
        instance.duration = initializer.duration || null;
        instance.daysInPregnancy = initializer.daysInPregnancy || null;
        instance.heatIndexPeak = initializer.heatIndexPeak || null;
        instance.newGroupId = initializer.newGroupId || null;
        instance.newGroupName = initializer.newGroupName || null;
        instance.currentGroupId = initializer.currentGroupId || null;
        instance.currentGroupName = initializer.currentGroupName || null;
        instance.destinationGroupName = initializer.destinationGroupName || null;
        instance.destinationGroup = initializer.destinationGroup || null;
        instance.calvingEase = initializer.calvingEase || null;
        instance.newborns = initializer.newborns || null;
        instance.cowEntryStatus = initializer.cowEntryStatus || null;
        instance.birthDateCalculated = initializer.birthDateCalculated || null;
        instance.sire = initializer.sire || null;
        instance.breedingNumber = initializer.breedingNumber || null;
        instance.isOutOfBreedingWindow = initializer.isOutOfBreedingWindow || null;
        instance.interval = initializer.interval;

        return instance;
      }
}
